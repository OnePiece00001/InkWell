import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
  const [temp, setTemp] = useState(0)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        setTemp(!temp);
        authService.logout().then(() => {
            dispatch(logout())
        })        
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn