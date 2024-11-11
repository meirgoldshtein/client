import React, { useEffect } from 'react'
import { RootState, useAppSelector } from '../redux/store'
import { useNavigate } from 'react-router-dom'

export default function Statistics() {
  const user = useAppSelector((state:RootState) => state.user)
  const navigate = useNavigate()
 useEffect(() => {
    if(user.user?._id && !user.user.isAdmin){
      console.log('navigate to votes')
      console.log(user.user._id)
      navigate("/votes")
    }
    if(!user.user?._id){
      navigate("/login")

    }
  }, [])
  return (
    <div>S</div>
  )
}
