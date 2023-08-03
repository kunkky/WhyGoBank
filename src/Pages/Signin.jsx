import { React, useState, useLayoutEffect } from 'react'
import Logo from './../Assets/Images/darklogo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import BaseUrl from '../BaseUrl'

const Signin = () => {
  const navigate=useNavigate()

  //check if user already is logged in 
  useLayoutEffect(() => {
    document.title = "Login | Big Money awaits you"
    if (sessionStorage.getItem("token")) {
      window.location.href = "/dashboard"
    }
  }, [])


  //use states variables for all input and states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [PasswordEyes, setPasswordEyes] = useState('visibility')
  const [PasswordType, setPasswordType] = useState('password')
  const [PasswordError, setPasswordError] = useState(null)
  const [EmailError, setEmailError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setfeedback] = useState('')
  const LoginUrl ='login';
  let userInfo = {};
  
  //password toggle
  const togglePassword = () => {
    if (PasswordEyes === 'visibility') {
      setPasswordEyes('visibility_off');
      setPasswordType('text')
    }
    else {
      setPasswordEyes('visibility');
      setPasswordType('password')

    }
  }

  //Input Handlers here
  const InputPasswordHandler = (e) => {
    //set password
    setPassword(e.target.value)
    setPasswordError(null);
    setfeedback('')
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
    setEmailError(null);
    setfeedback('')
  }

  //Input Handlers End here
//sign in api function
  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(BaseUrl+LoginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          userInfo
        ),
      });
      const data = await response.json();
      if (response.ok) {

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard", {
          state: {
          data,
          message: `welcome `},
          replace: true,
        });
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
    setfeedback("");
    //validate form
    if (email.includes("@") !== true || email.includes(".") !== true) {
      //throw error
      setEmailError("Use a Valid Email")
    }


    else  {
     
      userInfo = { email, password }
    //call Api      
     fetchApi();

    }
  }
  return (
    <div className=' w-screen h-[100svh] lg:h-auto flex justify-center items-center flex-col lg:p-5 lg:w-[800px]'>
      <div className="">
        <img src={Logo} alt="" className=' w-28 sm:w-40 lg:w-52' />
      </div>
      <div className="text-[#020216] text-center m-1 font-bold sm:m-2 sm:text-3sxl sm:font-bold"> Why Go Bank</div>

      <form className="w-full p-5 md:w-[700px] flex flex-col gap-2" onSubmit={FormHandler}>
        <input type="text" name="email" placeholder='Email' onInput={(e) => emailHandler(e)} className='p-3 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
        <div className='mt-[-0.5rem] text-[#81020C] text-[12px] mb-2'>{EmailError !== null && EmailError}</div>
        <div className="relative">
          <input type={PasswordType} name="password" placeholder='Password' onInput={(e) => InputPasswordHandler(e)} className='w-full p-3 text-[#020216] bg-[#F8F1E9] rounded-sm mb-2' />
          <div className="absolute right-0 top-0 p-2 flex items-center" onClick={togglePassword}>
            <span className="material-symbols-outlined text-[#CCCCD0]">
              {PasswordEyes}
            </span>
          </div>
        </div>
        <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{PasswordError !== null && PasswordError}</div>
        {feedback !== '' && <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{feedback}</div> }
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
          : <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Sign in</button>
        }
        
      </form>
      <div className='border-t-solid border-t-2 border-[#F8F1E9] mt-2 p-2 text-center w-[80%] lg:w-[600px]'>
        <Link to="/passwordReset" className='font-bold text-center cursor-pointer'>Forget Password</Link> <br />
        <Link to="/signup" className='font-bold cursor-pointer'>New User? Sign Up</Link>   

      </div>
    </div>
  )
}

export default Signin