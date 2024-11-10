import React from 'react'
import { NavLink } from 'react-router-dom'
import { RootState, useAppSelector } from '../redux/store'

export default function Nav() {
  const user = useAppSelector((state:RootState) => state.user)
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


      <button onClick={() => alert("logout success")}>Logout</button>
    </div>
  )
}
