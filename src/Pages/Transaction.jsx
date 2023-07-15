import { React, useCallback } from 'react'
import Nav from '../Components/Nav'
import TransactionScreen from '../Components/TransactionScreen'
import { useNavigate } from 'react-router-dom'




const Transaction = () => {

  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  }


  const navtoPayment = useCallback((RecipientAcct) => {
    
    // use callback to perform function once
    navigate("/amount", {
      state: RecipientAcct,
      replace: true,
    });
   
  }, [navigate]);

  return (
    <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
      <TransactionScreen handleGoBack={handleGoBack} navtoPayment={navtoPayment} />
      <Nav />
    </div>
  )
}

export default Transaction
