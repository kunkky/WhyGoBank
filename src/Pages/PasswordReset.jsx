import { React, useState, useLayoutEffect } from 'react'
import Logo from './../Assets/Images/logo.png'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'


const PasswordReset = () => {

    const [loading, setLoading] = useState(false)
    const [feedback, setfeedback] = useState('')
    const [successFb, setSuccessFb] = useState(null)

    //check if user already is logged in 
    useLayoutEffect(() => {
        document.title = "Password reset | Big Money awaits you"
        if (sessionStorage.getItem("token")) {
            window.location.href = "/dashboard"
        }
    }, [])


    //use states variables for all input and states
    const [email, setEmail] = useState('')
    const [EmailError, setEmailError] = useState(null)

    let userInfo = {}

    const LoginUrl = 'http://127.0.0.1:8000/api/reset';

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setEmailError(null);
        setfeedback('')

    }
    //sign in api function
    const fetchApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(LoginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    userInfo
                ),
            });
            const data = await response.json();
            if (response.ok) {
                    setSuccessFb(data.message)
            } else {
                setLoading(false);
                setfeedback(data.message)

            }
        } catch (error) {
            setLoading(false);
            setfeedback(error)
        }
    };


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
            userInfo={email}
            fetchApi()
        }
    }
  return (
      <div className=' w-screen h-[100svh] lg:h-auto flex justify-center items-center flex-col lg:p-5'>
          <div className="">
              <img src={Logo} alt="" className=' w-28 sm:w-40 lg:w-52' />
          </div>
          <div className="text-[#020216] text-center m-1 font-bold sm:m-2 sm:text-3sxl sm:font-bold"> Why Go Bank</div>
          {successFb === null ? 
          <form className="w-full p-5 md:w-[700px] flex flex-col" onSubmit={FormHandler}>
              <input type="text" name="email" placeholder='Email' onInput={(e) => emailHandler(e)} className='p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
              <div className='mt-[-0.5rem] text-[#81020C] text-[12px] mb-2'>{EmailError !== null && EmailError}</div>
              {feedback !== '' && <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{feedback}</div>}
              {loading === true ? <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1] text-center flex items-center  justify-center' disabled>
                  <ThreeDots
                      height="30"
                      width="30"
                      radius="9"
                      color="#DECBF1"
                      ariaLabel="three-dots-loading"
                      visible={true}
                  />
              </button>
                      : <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Reset Password</button>
              }

          </form>
              : <div className="text-center font-bold text-2xl">Password Reset Link Sent{setSuccessFb}</div>
          }
          <div className='border-t-solid border-t-2 border-[#F8F1E9] mt-2 p-2 text-center w-[80%] lg:w-[600px]'>
              <Link to="/signin" className='font-bold text-center cursor-pointer'>Sign In</Link> <br />
              <Link to="/signup" className='font-bold cursor-pointer'>Sign Up</Link>  New User

          </div>
      </div>
  )
}

export default PasswordReset