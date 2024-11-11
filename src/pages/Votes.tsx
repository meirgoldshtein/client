import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchCandidates, voteForCandidate } from '../redux/slices/candidateSlice'
import { updateVoteStatus } from '../redux/slices/userSlice'
export default function Votes() {
  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const candidates = useAppSelector((state: RootState) => state.candidates)
  const navigator = useNavigate()

  useEffect(() => {
    if (!user.user?._id) {
      navigator("/login")
    }
    else {
      dispatch(fetchCandidates())
    }
  }, [user])

  const vote = (id: string) => {
    dispatch(voteForCandidate(id))
    dispatch(updateVoteStatus(id))
  }
  return (
    <div className='votes'>
      <h1>Votes</h1>
      {candidates.candidates?.map((candidate) => (
        <div key={candidate._id} className='candidate'>
          <h2>{candidate.name}</h2>
          <img className='candidate-image' src={candidate.image} alt="candidate image" />
          <button disabled={user.user?.votedFor === candidate._id} onClick={() => vote(candidate._id)}>
            {user.user?.votedFor === candidate._id ? "Your Vote" : "Vote"}
          </button>
        </div>
      ))}
    </div>
  )
}
