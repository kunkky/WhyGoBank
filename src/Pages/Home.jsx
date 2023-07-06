import {React } from 'react'
import Logo from './../Assets/Images/logo.png'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='bg-[#020216] w-screen h-screen flex justify-center items-center flex-col'>
        <div className="">
        <Link to='/signin'><img src={Logo} alt="" className='w-44 sm:w-60 lg:w-96' /></Link> 
        </div>
      <div className="text-white text-center m-3 text-2xl sm:m-10 sm:text-5xl sm:font-bold"> Why Go Bank</div>
    </div>
  )
}

export default Home