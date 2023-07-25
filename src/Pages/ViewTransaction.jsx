import { React, useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import useSingleTransaction from '../Hooks/useSingleTransaction';
import { ProgressBar } from 'react-loader-spinner'
import DateWrapper from '../Components/DateWrapper';

const ViewTransaction = () => {
    const { transactionId } = useParams();
    console.log(transactionId);
    const navigate = useNavigate();


    const handleGoBack = () => {
        navigate(-1);
    }
    const { loading, actfeedback, transaction } = useSingleTransaction("SingleTraansaction", transactionId)
    let tDate = transaction.created_at;
console.log(transaction);


  return (
  <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
          <div className=" w-full flex-col bg-white flex">

              <div className="flex px-10 h-[auto] p-1 gap-2 flex-col w-full">
                  <div className="w-full flex justify-between items-center">

                      <div className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={() => handleGoBack()}>
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
          <div className='p-5 flex flex-col m-5 bg-blue-50 rounded-sm'>
              {
                  loading === true ? < div className="flex flex-row items-center justify-center h-full w-full"> <ProgressBar
                      height="100"
                      width="100%"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor='none'
                      barColor='#000000'
                  /> </div> : 
                        <>
                            <small className='text-[10px] '> Receiver's Name</small>
                        <h1>{transaction.reciever_account_name}</h1>
                            <small className='text-[10px] '> Receiver's Account Number</small>
                        <h1>{transaction.receiver_account_number}</h1>
                            <small className='text-[10px] '> Bank</small>
                        <h1>{transaction.reciever_bank_name}</h1>
                            <small className='text-[10px] '> Date</small>
                        <h1><DateWrapper tDate={tDate} /></h1>
                            <small className='text-[10px] '> Status</small>
                        <h1>{transaction.status}</h1>
                            <small className='text-[10px] '> Naration</small>
                          <h1>{transaction.naration}</h1>
                            <small className='text-[10px] '> Reference Number</small>
                        <h1>{transaction.transation_id}</h1>
                          <button className='m-5 p-2 text-center text-white bg-blue-950 rounded-sm' >Print</button>
                      </>
              }
          
          </div>
      <Nav />
    </div>
  )
}

export default ViewTransaction