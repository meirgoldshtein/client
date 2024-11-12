import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { fetchRegister } from '../redux/slices/userSlice'

export default function Register() {
  const user = useAppSelector((state:RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 
  useEffect(() => {
    if(user.user?._id){
      navigate("/votes")
    }
  }, [])
  return (
    <div className='register'>
      <input type="text" value={username}
       placeholder='please enter a username'
         onChange={(e) => setUsername(e.target.value) }
         />
         <input type="text"
         value={password}
         placeholder='please enter your password'
         onChange={(e) => setPassword(e.target.value) }
         />
         <button onClick={()=>{
         dispatch(fetchRegister({username, password, isAdmin: false}));
          navigate("/login")}}>Register</button>
    </div>
  )
}
