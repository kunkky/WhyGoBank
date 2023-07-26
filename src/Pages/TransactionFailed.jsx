import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const TransactionFailed = () => {
  const navigate=useNavigate()

    useEffect(() => {
        navigate('/dashboard', {state:{
        message:"transaction Failed"
        }});
  
    }, [])

  return (
    <div>Transaction Failed</div>
  )
}

export default TransactionFailed