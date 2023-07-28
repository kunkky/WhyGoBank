import React from 'react'
import ErrorPageImg from '../Assets/Images/errorPage.gif'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex item-center justify-between flex-col p-5'>
      <img src={ErrorPageImg} alt="Error 404" />
      <Link to='/home' className='mt-20 w-full p-5 text-center rounded bg-[#020216] text-[#DECBF1]'>Go Home</Link>
    </div>
  )
}

export default ErrorPage