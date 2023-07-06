import { React, useState } from 'react'
import Logo from './../Assets/Images/logo.png'
import { Link } from 'react-router-dom'

const PasswordReset = () => {

    //use states variables for all input and states
    const [email, setEmail] = useState('')
    const [EmailError, setEmailError] = useState(null)

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setEmailError(null);
    }

    //FormHandler

    const FormHandler = (e) => {
        e.preventDefault();
        //validate form
        if (email.includes("@") !== true || email.includes(".") !== true) {
            //throw error
            setEmailError("Use a Valid Email")
        }

        else {
            //no error u can proceed
            console.log('you can register user as no error is found');

        }
    }
  return (
      <div className=' w-screen h-[100svh] lg:h-auto flex justify-center items-center flex-col lg:p-5'>
          <div className="">
              <img src={Logo} alt="" className=' w-28 sm:w-40 lg:w-52' />
          </div>
          <div className="text-[#020216] text-center m-1 font-bold sm:m-2 sm:text-3sxl sm:font-bold"> Why Go Bank</div>

          <form className="w-full p-5 md:w-[700px] flex flex-col" onSubmit={FormHandler}>
              <input type="text" name="email" placeholder='Email' onInput={(e) => emailHandler(e)} className='p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
              <div className='mt-[-0.5rem] text-[#81020C] text-[12px] mb-2'>{EmailError !== null && EmailError}</div>
              
              <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Get Reset Password Link</button>
          </form>
          <div className='border-t-solid border-t-2 border-[#F8F1E9] mt-2 p-2 text-center w-[80%] lg:w-[600px]'>
              <Link to="/signin" className='font-bold text-center cursor-pointer'>Sign In</Link> <br />
              <Link to="/signup" className='font-bold cursor-pointer'>Sign Up</Link>  New User

          </div>
      </div>
  )
}

export default PasswordReset