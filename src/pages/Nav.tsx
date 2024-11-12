import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState, useAppSelector } from '../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/userSlice'

export default function Nav() {
  const user = useAppSelector((state:RootState) => state.user)
  const dispatch = useDispatch()
  const navigator = useNavigate()
  return (
    <div className='nav'>
      {user.user?.isAdmin && <NavLink to="/statistics">Statistics</NavLink>}
      {user.user?(<>
        
        <NavLink to="/votes">Vote</NavLink>
      </>

      ):(     
        <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        </> )
    }


      <button onClick={() =>{
      dispatch(logout())
        alert("logout success")
        navigator("/login")
      } }>Logout</button>
    </div>
  )
}
