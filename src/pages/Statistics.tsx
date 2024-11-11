import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useNavigate } from 'react-router-dom'

export default function Statistics() {
  const user = useAppSelector((state:RootState) => state.user)
  const dispatch = useAppDispatch()
  const candidates = useAppSelector((state:RootState) => state.candidates)
  const navigate = useNavigate()
 useEffect(() => {
    if(user.user?._id && !user.user.isAdmin){
      console.log('navigate to votes')
      console.log(user.user._id)
      navigate("/votes")
    }
    else if(!user.user?._id){
      navigate("/login")

    }
  }, [user])
  return (
    <div>
      <h1>Statistics</h1>
      
      {candidates.candidates?.map((candidate) => (
        <div key={candidate._id} className='candidate-data'>
          <h2>{candidate.name}</h2>
          <h2>{candidate.votes} - votes</h2>
          <img className='candidate-image' src={candidate.image} alt="candidate image" />
          </div>
      ))}
    </div>
  )
}
