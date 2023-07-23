import {React, useEffect, useState} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import useSendMoney from './../Hooks/useSendMoney'
import useGetBalance from '../Hooks/useGetBalance'



const AmountToTransfer = () => {


  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number =  UserDetails.user.account_number;


//use navigate to go back
const  navigate=useNavigate()

//Go back Function
  const goBack = () => {
    navigate(-1);
  }

//get saved data to transfer to
const location= useLocation();
    const TransationDetails = location.state;

//redirect if user data was not sent
    useEffect(() => {
        if (TransationDetails === null) {
            navigate(-1);

        }
    }, [TransationDetails, navigate])
   
  //set state forvariables 
  const [amount, setAmount] = useState('')
  //set state forBalance 
  const [balance, setBalance] = useState('')
  const [moneyError, setMoneyError] = useState(null)
  const [inputPin, setInputPin] = useState(false)

  const [PasswordEyes, setPasswordEyes] = useState('visibility')
  const [PasswordType, setPasswordType] = useState('password')
  const [password, setPassword] = useState('')
  const [PasswordError, setPasswordError] = useState(null)
  const [transactionDetail, setTransactionDetail] = useState(null)
//get balance variables 
//fetch user account balance with Custom hook
  const getBalance = useGetBalance(account_number, "accountDetails")

  const accBal =Number(getBalance.accountBal);

  
  const cleanAmount = (userInput)=>{
  //use regex remove things that are not number

    const cleanValue = userInput.replace(/[A-Za-z,]/g, ''); // Remove existing commas from the input value
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add thousand separators

    setAmount(formattedValue);
    //calculate balance
    const userBal = accBal-Number(cleanValue)
    setBalance(userBal)
    setMoneyError(null)
    setInputPin(false)
    
  }

  //set transfer Money Function 
  const transferMoney=(e)=>{
  e.preventDefault()
    if (balance <= 100) {
      setMoneyError('Balance must be above NGN 100')
    }
    else {
      setMoneyError(null)
      setInputPin(true)
    }


  }
//toggle password eye
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
  const InputPasswordHandler = (input) => {
    //set password
    const cleanValue = input.replace(/\D/g, '');
   setPassword(cleanValue);
    setPasswordError(null)

  }
  //confirm transaction pin
  const confirmPin=()=>{
    setLoading(true)
    const transaction_pin = UserDetails.user.transaction_pin;
    //check if pin length is less  than 6
    if (password.length<6){
      setPasswordError('PIN should not be less than 6 Digits')
      setLoading(false)

    }
    else if (Number(password) !== transaction_pin ){
      setPasswordError('Incorrect Pin')
      setLoading(false)
    }
    else{
      setPasswordError(null)
      const clearedAmt = amount.replace(/,/g, '')
      setTransactionDetail({
        sender_account_number: UserDetails.user.account_number,
        sender_account_name: UserDetails.user.fullname,
        receiver_account_number: TransationDetails.account_number,
        reciever_account_name: TransationDetails.account_name,
        reciever_bank_name: TransationDetails.bank_name,
        amount: clearedAmt,
        naration: "null",
      })

    }
  }
//fectch api

  const [loading, setLoading] = useState(false)
  //send money with custom hook

  const sender = useSendMoney('sendMoney', transactionDetail)
  
const redirector=()=>{
    //redirect  to success page

  if (sender.apifeedback !== null ){
    const transResult = {
      transactionResult: transactionDetail,
      transStatus: sender.apifeedback,
    }
    navigate('/TransactionResult', 
    {
      state: transResult,
      replace: true,
    }
    );
 }
}


  useEffect(() => {
    redirector()
  }, [sender.apifeedback])
  
  


//rediect if senderfeedback is successful

  return (
    <div>
      <div className='w-full  h-[85%] '>
        <div className=" w-full flex-col bg-white flex">

          <div className="flex px-10 h-[auto] p-1 gap-2 flex-col w-full">
            <div className="w-full flex justify-between items-center">

              <div className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={() => goBack()}>
                arrow_back_ios
              </div>


              <div className="h-[100%] mt-[15px] flex justify-center items-center">
                <Link to="/profile">
                  <span className="material-symbols-outlined text-[#E6CCCE] h-[10px]">
                    logout
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[70%] flex p-5">
          {
            <div className=' bg-[#F8F4FC] rounded p-5 w-full'>
              <h1 className='text-sm text-[#9A9AA2] mb-5'>Transaction Amount </h1>
              <div className='text-[#676773]'>Bank {TransationDetails.bank_name}</div>
              <div className='text-[#676773]'>{TransationDetails.account_number}</div>
              <div className='text-[#676773] font-medium'>{TransationDetails.account_name}</div>
              <form onSubmit={transferMoney} className='mt-4'>
                <label className='text-sm text-[#9A9AA2]'>Amount</label>
                <div className="relative">
                  <input type='text' name="0.00" placeholder="amount to Transfer" className='w-full p-2 text-[#020216] bg-[#F8F1E9] font-bold rounded text-right mb-2' value={amount} onInput={(e) => cleanAmount(e.target.value)} />
                  <div className="absolute left-0 top-0 p-2 flex items-center">
                    NGN
                  </div>
                  </div>
                <div className=' text-sm text-[#81020C]'>{moneyError}</div>
                <div className='text-sm text-[#9A9AA2]'>Balance after Transfer </div>
                {balance !== '' && <div>NGN {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>}
                {inputPin === false ? (
                  <button
                    className="bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1] mt-4" disabled={amount.length < 2}
                  >
                    Send Money
                  </button>
                ) : (
                  <div>
                      <div className="relative mt-5">
                        <input type={PasswordType} name="password" placeholder='Transfer Pin' onInput={(e) => InputPasswordHandler(e.target.value)} className='w-full p-2 text-[#CCCCD0] bg-[#F8F1E9] rounded-sm mb-2' value={password}/>
                        <div className="absolute right-0 top-0 p-2 flex items-center" onClick={togglePassword}>
                          <span className="material-symbols-outlined text-[#CCCCD0]">
                            {PasswordEyes}
                          </span>
                        </div>
                      </div>
                      <div className='text-[#81020C] text-sm'>{PasswordError}</div>
                      <button
                        className="bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1] mt-4  text-center flex items-center  justify-center" onClick={confirmPin}
                        disabled={loading}>
                        {
                          loading===true?
                            <ThreeDots
                              height="30"
                              width="30"
                              radius="9"
                              color="#DECBF1"
                              ariaLabel="three-dots-loading"
                              visible={true}
                            /> : "Confirm Pin"
                        }
                      </button>
                  </div>
                )}
              </form>
          </div>
          }

        </div>
      </div>
    
    
    </div>
  )
}

export default AmountToTransfer