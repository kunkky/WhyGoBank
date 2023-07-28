import { React, useState } from 'react'
import Logo from '.././Assets/Images/logo.png'
import OtherTransaction from './OtherTransaction';
import SameTransaction from './SameTransaction';
import { Link } from 'react-router-dom';




const TransactionScreen = (props) => {
    const goBack = props.handleGoBack;
    const navtoPayment = props.navtoPayment;
    const [transactionType, setTransactionType] = useState('')
    const logOut = props.logOut;
 

    const TransChoice = (choice) => {
        setTransactionType(choice)
    }



 
  return (
      <div className='w-full  h-[85%] '>
          <div className=" w-full flex-col bg-white flex">

              <div className="flex px-10 h-[auto] p-1 gap-2 flex-col w-full">
                  <div className="w-full flex justify-between items-center">
                     
                      <div className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={() => goBack()}>
                          arrow_back_ios
                      </div>


                      <div className="h-[100%] mt-[15px] flex justify-center items-center">
                          <span className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={logOut}>
                                  logout
                              </span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="w-full h-[70%] flex p-5">

              {
                  transactionType === '' ?
                  <>
                        <div className='w-full  h-[100%] '>
                          <div className=" w-full flex-col h-[auto] flex">
                              <div className="p-5 flex flex-col gap-5">

                                  <div className="bg-[#F8F4FC] p-5 rounded w-full h-auto flex flex-row justify-between items-center">
                                      <div className='flex flex-row item-center justify-center' onClick={addEventListener => (TransChoice('same'))}>
                                          <div className=" bg-[#020216] py-4 px-2 rounded mr-2">
                                              <span className="material-symbols-outlined text-[#DECBF1]">
                                                  account_balance
                                              </span>

                                          </div>
                                          <div className='flex items-center justify-center text-sm'>To WhyGoBank Account</div>
                                      </div>
                                      <div className="flex justify-center items-center">
                                          <span className="material-symbols-outlined text-[#020216]">
                                              arrow_forward_ios
                                          </span>
                                      </div>
                                  </div>

                                  <div className="bg-[#F8F4FC] p-5 rounded w-full h-auto flex flex-row justify-between items-center" onClick={() => (TransChoice('others'))}>
                                      <div className='flex flex-row item-center justify-center'>
                                          <div className=" bg-[#020216] py-4 px-2 rounded mr-2">
                                              <img src={Logo} alt="" className='w-full h-[15px]' />
                                          </div>
                                              <div className='flex items-center justify-center  text-sm'>To Other Account</div>
                                      </div>
                                      <div className="flex justify-center items-center">
                                          <span className="material-symbols-outlined text-[#020216]">
                                              arrow_forward_ios
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                  

                  </div>
                  </>
                      :

                      transactionType === 'same' ?
                          <SameTransaction navtoPayment={navtoPayment} />
                          :
                          transactionType === 'others' &&
                          <OtherTransaction navtoPayment={navtoPayment}/>
                              

              }


          </div>
      </div>
  )
}

export default TransactionScreen

