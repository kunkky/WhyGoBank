import {React, useEffect} from 'react'
import Logo from './../Assets/Images/logo.png'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {
const navigate = useNavigate();
 useEffect(() => {
  setTimeout(()=>{
    return navigate("/signin")
      },3000)
 }, [navigate])

 
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