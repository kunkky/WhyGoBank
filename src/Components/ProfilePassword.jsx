import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import useUpdateProfile from '../Hooks/useUpdateProfile'

const ProfilePassword = () => {
  const navigate = useNavigate();

  //use states variables for all input and states
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [PasswordEyes, setPasswordEyes] = useState('visibility')
  const [PasswordType, setPasswordType] = useState('password')
  const [ConfirmPasswordEyes, setConfirmPasswordEyes] = useState('visibility')
  const [confirmPasswordType, setconfirmPasswordType] = useState('password')
  const [PasswordError, setPasswordError] = useState(null)
  const [ConfirmPassError, setConfirmPassError] = useState(null)
  const [feedback, setfeedback] = useState('')
  const [changepassword, setChangepassword] = useState(null)
  
//set toggle

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

  //confirm Password toggle
  const toggleConfirm = () => {
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
    setfeedback('')
  }
  const InputConfirmPasswordHandler = (e) => {
    //set password
    setConfirmPassword(e.target.value)
    setConfirmPassError(null);
    setfeedback('')
  }

  const FormHandler = (e) => {
    e.preventDefault();
    setConfirmPassError(null);

    //validate form
    if (password !== confirmPassword) {
      setConfirmPassError("Password Does not match confirm password")
    }
    else if (password.length <7) {
      //throw error
      setPasswordError("Password must be more than 6 characters")
    }


    else {

      //call Api   using use Effect renrendering   
      setChangepassword(password)

    }
  }
//using custome hook
  const { updateloading, updateFeedback } = useUpdateProfile('updatePassword', changepassword);
  if (updateFeedback !== null) {
    navigate('/dashboard', {
      state: {
        message: updateFeedback.message
      },
    })
  }


  return (
    <div>
      <form className="w-full p-5 md:w-[700px] flex flex-col" onSubmit={FormHandler}>
        <div className="relative">
          <input type={PasswordType} name="password" placeholder='New Password' onInput={(e) => InputPasswordHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
          <div className="absolute right-0 top-0 p-2 flex items-center" onClick={togglePassword}>
            <span className="material-symbols-outlined text-[#CCCCD0]">
              {PasswordEyes}
            </span>
          </div>
        </div>
        <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{PasswordError !== null && PasswordError}</div>
        <div className="relative">
          <input type={confirmPasswordType} name="confirmPassword" placeholder='Confirm New Password' onInput={(e) => InputConfirmPasswordHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
          <div className="absolute right-0 top-0 p-2 flex items-center" onClick={toggleConfirm}>
            <span className="material-symbols-outlined text-[#CCCCD0]">
              {ConfirmPasswordEyes}
            </span>
          </div>
        </div>
        <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{ConfirmPassError !== null && ConfirmPassError}</div>
        {feedback !== '' && <div className='mt-[-0.5rem] text-[12px] text-[#81020C] mb-2'>{feedback}</div>}
        {updateloading === true ? <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1] text-center flex items-center  justify-center' disabled>
          <ThreeDots
            height="30"
            width="30"
            radius="9"
            color="#DECBF1"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </button>
          : <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Change Password</button>
        }

      </form>

    
    </div>
  )
}

export default ProfilePassword