import React, { useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchLogin } from '../redux/slices/userSlice'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()
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
