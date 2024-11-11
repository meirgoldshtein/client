import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppSelector } from '../redux/store'

export default function Register() {
  const user = useAppSelector((state:RootState) => state.user)
  const navigate = useNavigate()
 
  useEffect(() => {
    if(user.user?._id){
      console.log('navigate to votes')
      console.log(user.user._id)
      navigate("/votes")
    }
  }, [])
  return (
    <div>R</div>
  )
}
