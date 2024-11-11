import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { fetchLogin } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useAppSelector((state:RootState) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(user.user?._id){
      console.log('navigate to votes')
      console.log(user.user._id)
      navigate("/votes")
    }
  }, [user])


  return (
    <div className='login'>
      <input type="text" value={username}
       placeholder='please enter your username'
         onChange={(e) => setUsername(e.target.value) }
         />
         <input type="text"
         value={password}
         placeholder='please enter your password'
         onChange={(e) => setPassword(e.target.value) }
         />
         <button onClick={()=>dispatch(fetchLogin({username, password}))}>Login</button>
    </div>
  )
}
