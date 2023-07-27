import { React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import useUpdateProfile from '../Hooks/useUpdateProfile'


const ProfilePin = () => {

    const navigate =useNavigate();

    //use states variables for all input and states
    const [Pin, setPin] = useState('')
    const [PinError, setPinError] = useState(null)
    const [changepin, setChangepin] = useState(null)

    const [confirmPin, setConfirmPin] = useState('');
    

    const pinHandler = (e) => {
        const cleanValue = e.target.value.replace(/[A-Za-z,]/g, ''); // Remove existing commas from the input value
        if (cleanValue.length <= 6) {
        setPin(cleanValue)
            setPinError(null);

        }
        else{
            setPinError('PIN Should be 6 Numbers');
        }
        
        
    }
    const confirmPinHandler = (e) => {
        const cleanValue = e.target.value.replace(/[A-Za-z,]/g, ''); 
        if (cleanValue.length<=6){
        setConfirmPin(cleanValue)
        setPinError(null);
        }
        else{
            setPinError('PIN Should be 6 Numbers');
        }
        
    }

    
    const { updateloading, updateFeedback } = useUpdateProfile('updatePin', changepin);
    if (updateFeedback!==null){
        navigate('/dashboard', {
            state: {
                message: updateFeedback.message
            },
        })
    }
    const FormHandler = (e) => {
        e.preventDefault();
        setPinError(null);

        //validate form
        if ( Pin.length !== 6 ){
            setPinError("PIN must be 6 Numbers")
        }
        else if (Pin !== confirmPin) {
            //throw error
            setPinError("PIN Does not match Confirm PIN")
        }


        else {

           //call Api   using use Effect renrendering   
            setChangepin(Pin)

        }
    }
  return (
      <div className="p-5 pt-0">
          <form className="w-full p-5 md:w-[700px] flex flex-col" onSubmit={FormHandler}>

              <div className="relative">
                  <input type="password" placeholder='PIN' value={Pin} onInput={(e) => pinHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
              </div>

              <div className="relative">
                  <input type='password' placeholder='Confirm PIN' value={confirmPin} onInput={(e) => confirmPinHandler(e)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' />
              </div>
        
        <div className='mt-[-0.5rem] text-[#81020C] text-[12px] mb-2'>{PinError !== null && PinError}</div>
       
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
          : <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1]'>Change Pin</button>
        }
        
      </form>
          
      </div>
  )
}

export default ProfilePin