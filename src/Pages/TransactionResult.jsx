import { React, useEffect, useState,  } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TransactionFailed from './TransactionFailed';
import TransactionSuccessful from '../Components/TransactionSuccessful';

const TransactionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tranStatus, setTranStatus] = useState('')
  useEffect(() => {
    if (!location.state.transStatus) {
      navigate(-1);
    }
   
  }, [])
  console.log(location.state.transStatus);
    setTranStatus(location.state.transStatus)

  const transactionResult=navigate.state;
      console.log(navigate.state);
  return (
    tranStatus ==='successful' ?
      // <TransactionSuccessful transactionResult={transactionResult}/>
      'success':
      <TransactionFailed />
  )
}

export default TransactionResult

