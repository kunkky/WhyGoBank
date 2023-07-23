import { React, useState, useEffect } from 'react'
import BaseUrl from '../BaseUrl';


const useGetSameBank = (url, account_number) => {
    const [whyGoAcct, setWhyGoAcct] = useState([])
    const [whyGoAcctError, setWhyGoAcctError] = useState(null)
    const [whyGoAcctloader, setwhyGoAcctloader] = useState(false)
    const accessToken = sessionStorage.getItem("token");

//fetch its api
const SameBank = async () => {
    setwhyGoAcctloader(true)
    fetch(BaseUrl + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(
            { "account_number": account_number }
        )
    })
        .then(response => response.json())
        .then(data => {
            // Data successfully retrieved
            data.message ? setWhyGoAcctError(data.message) : setWhyGoAcct(data)
            setwhyGoAcctloader(false)
        })
        .catch(error => {
            // Handle any errors
            setWhyGoAcctError(error)
            setwhyGoAcctloader(false)
        });
}

useEffect(() => {
    SameBank()
}, [account_number])


  return (
  {
          whyGoAcct,
          whyGoAcctError,
          whyGoAcctloader,
  }
  )
}

export default useGetSameBank