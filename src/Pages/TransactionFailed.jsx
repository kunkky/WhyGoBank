import { useNavigate } from 'react-router-dom';
import failImg from '../Assets/Images/Bankruptcy.gif'
const TransactionFailed = () => {
  const navigate=useNavigate()
  const goHome =()=>{
  navigate('/dashboard', {state:{
  message:'Transaction Not successful'
  }})
  }
  return (
    <div className='w-screen flex flex-col h-screen justify-center items- p-5'>
      <img src={failImg} alt="failed Transation" />
      <h1 className='text-center text-2xl mb-4'>Transaction Failed</h1>
      <button onClick={goHome} className='bg-[#020216] text-[#E5D5F4] w-full p-3 rounded-sm'>Go Back Home</button>
    </div>
  )
}

export default TransactionFailed