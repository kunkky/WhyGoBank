import React, { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toast = (props) => {
    let message = null;
    const messageHolder = props.message;
   
    if (props.message){
        message=messageHolder;
    }
    
    const notify = () => 
    toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    ;
    useEffect(() => {
    if(message!==null){
        notify()
    }
    }, [message])
  return (
    <div>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="light"
          />
      </div>

  )
}

export default Toast