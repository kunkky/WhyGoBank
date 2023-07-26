import { React, useCallback, useEffect, useState,  } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TransactionFailed from './TransactionFailed';
import TransactionSuccessful from '../Components/TransactionSuccessful';
import html2canvas from 'html2canvas';

const TransactionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tranStatus, setTranStatus] = useState('')
  
  useEffect(() => {
    if (!location.state.transStatus) {
      navigate(-1);
    }
   
  }, [])
    useEffect(() => {
    setTranStatus(location.state.transStatus)

    }, [])
    
  const transactionResult = location.state.transactionResult;
  return (
    tranStatus ==='successful' ?
      <TransactionSuccessful transactionResult={transactionResult} />:
      <TransactionFailed />
  )

}

export default TransactionResult

