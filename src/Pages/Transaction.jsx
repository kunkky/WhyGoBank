import { React, useCallback, useState } from 'react'
import Nav from '../Components/Nav'
import TransactionScreen from '../Components/TransactionScreen'
import { useNavigate } from 'react-router-dom'
import useLogout from '../Hooks/useLogout'



const Transaction = () => {

  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  }


  const navtoPayment = useCallback((RecipientAcct) => {
    
    // use callback to perform function once
    navigate("/amount", {
      state: RecipientAcct,
    });
   
  }, [navigate]);
  
  const [logMeOut, setLogMeOut] = useState(false)

  //logout function
  const logOut = () => {
    setLogMeOut(true);

  }
  const handleLogoutSuccess = () => {
    window.location.href = '/';
  };
  useLogout(logMeOut, 'logOut', handleLogoutSuccess);




  return (
    <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
      <TransactionScreen handleGoBack={handleGoBack} navtoPayment={navtoPayment} logOut={logOut}/>
      <Nav />
    </div>
  )
}

export default Transaction
