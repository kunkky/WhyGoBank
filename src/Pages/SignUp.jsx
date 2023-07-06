import { React, useState } from 'react'
import Logo from './../Assets/Images/logo.png'
import { Link } from 'react-router-dom'

const SignUp = () => {

//use states variables for all input and states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [PasswordEyes, setPasswordEyes] = useState('visibility')
  const [PasswordType, setPasswordType] = useState('password')
  const [ConfirmPasswordEyes, setConfirmPasswordEyes] = useState('visibility')
  const [confirmPasswordType, setconfirmPasswordType] = useState('password')
  const [usernameError, setusernameError] = useState(null)
  const [PasswordError, setPasswordError] = useState(null)
  const [ConfirmPassError, setConfirmPassError] = useState(null)
  const [EmailError, setEmailError] = useState(null)
  const [FullnameError, setFullnameError] = useState(null)
  const [InputError, setInputError] = useState(false)


//password toggle
  const togglePassword= ()=>{
    if (PasswordEyes === 'visibility') {
      setPasswordEyes('visibility_off');
      setPasswordType('text')
    }
    else {
      setPasswordEyes('visibility');
      setPasswordType('password')

    }  
  }

//confirm Password toggle
  const toggleConfirm=()=>{
    if (ConfirmPasswordEyes === 'visibility') {
      setConfirmPasswordEyes('visibility_off');
      setconfirmPasswordType('text')
    }
    else {
      setConfirmPasswordEyes('visibility');
      setconfirmPasswordType('password')
    }
  }
//Input Handlers here
  const InputPasswordHandler = (e) => {
    //set password
    setPassword(e.target.value)
    setPasswordError(null);
  }
  const InputConfirmPasswordHandler = (e) => {
    //set password
    setConfirmPassword(e.target.value)
    setConfirmPassError(null);
  }
  const usernameHandler = (e) => {
    setUsername(e.target.value)
    setusernameError(null);
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
    setEmailError(null);
  }
  const fullnameHandler = (e) => {
    setName(e.target.value)
    setFullnameError(null);
  }

//Input Handlers End here

//FormHandler

  const FormHandler =(e)=>{
  e.preventDefault();
  //validate form
    if (name.length <= 3 || name.includes('0')) {
  //throw error
  setFullnameError("Please use a Valid Name")
  setInputError(true);
}
   else if (email.includes("@") !== true || email.includes(".") !== true) {
     //throw error
     setEmailError("Use a Valid Email")
     setInputError(true);
   }

  else  if (username.length <= 3) {
      //throw error
      setusernameError("Username should be more than 3")
      setInputError(true);
    }
   else if (password.length < 7) {
      //throw error
      setPasswordError("Password should be more than 6")
      setInputError(true);
    }
  else if (confirmPassword !== password) {
      //throw error
      setConfirmPassError("Confirm Password not correct")
      setInputError(true);
    }

    else if (InputError!==true){
      //no error u can proceed
      console.log('you can register user as no error is found');
    
    }
    else{
     console.log('you can not register user as no error is found');
    
    }
  }

  return (
    <div className=' w-screen h-[100svh] lg:h-auto flex justify-center items-center flex-col lg:p-5'>
      <div className="">
        <img src={Logo} alt="" className=' w-28 sm:w-40 lg:w-52' />
      </div>
      <div className="text-[#020216] text-center m-1 font-bold sm:m-2 sm:text-3sxl sm:font-bold"> Why Go Bank</div>

      <form className="w-full p-5 md:w-[700px] flex flex-col" onSubmit={FormHandler}>
        <input type="text" name="fullname" placeholder='Full Name' onInput={(e) => fullnameHandler(e)} className='p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2'/>
        <div className='mt-[-0.5rem] text-[12px] mb-2 text-[#81020C]'>{FullnameError !== null && FullnameError}</div>
        <input type="text" name="email" placeholder='Email' onInput={(e) => emailHandler(e)} className='p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
        <div className='mt-[-0.5rem] text-[#81020C] text-[12px] mb-2'>{EmailError !== null && EmailError}</div>
        <input type="text" name="Username" placeholder='Username' onInput={(e) => usernameHandler(e)} className='p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
          {usernameError !== null ? <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{usernameError } </div> :"" } 
        <div className="relative">
          <input type={PasswordType} name="password" placeholder='Password' onInput={(e) => InputPasswordHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
          <div className="absolute right-0 top-0 p-2 flex items-center" onClick={togglePassword}>
            <span className="material-symbols-outlined text-[#CCCCD0]">
              {PasswordEyes}
            </span>
        </div>
        </div>
        <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{PasswordError !== null && PasswordError}</div>
        <div className="relative">
          <input type={confirmPasswordType} name="confirmPassword" placeholder='Confirm Password' onInput={(e) => InputConfirmPasswordHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
          <div className="absolute right-0 top-0 p-2 flex items-center" onClick={toggleConfirm}>
            <span className="material-symbols-outlined text-[#CCCCD0]">
              {ConfirmPasswordEyes}
            </span>
          </div>
        </div>
        <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{ConfirmPassError !== null && ConfirmPassError}</div>
        <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Sign Up</button>
      </form>
      <div className='border-t-solid border-t-2 border-[#F8F1E9] mt-2 p-2 text-center w-[80%] lg:w-[600px]'>
        <Link to="/signin" className='font-bold cursor-pointer'>Sign In</Link>  Returning User <br />
        <Link to="/passwordReset" className='font-bold text-center cursor-pointer'>Forget Password</Link>
      
      </div>
    </div>
  )
}

export default SignUp