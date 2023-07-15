import {React, useEffect, useState} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'


const AmountToTransfer = () => {

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
  const cleanAmount = (userInput)=>{
  //use regex remove things that are not number
    setAmount(userInput.replace(/[A-Za-z]/g, ''));
    //calculate balance
  }

  //set transfer Money Function 
  const transferMoney=()=>{
  
  
  }
//get state
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
          <div>
              <h1>Transfer to </h1>
            <div>Name {TransationDetails.account_name}</div>
            <div>Acoount Number {TransationDetails.account_number}</div>
            <div>Bank {TransationDetails.bank_name}</div>
              <form onSubmit={transferMoney}>
              <label>Amount</label>
              <input type="number" value={amount} onInput={(e) => cleanAmount(e.target.value)}/>

              </form>
          </div>
          }

        </div>
      </div>
    
    
    </div>
  )
}

export default AmountToTransfer