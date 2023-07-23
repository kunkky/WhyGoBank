import {React, useState, useEffect} from 'react'
import BaseUrl from '../BaseUrl';

const useGetBalance = (accountNumber, url ) => {

//set all state
    const [balLoading, setBalLoading] = useState(false)
    const [actfeedback, setActfeedback] = useState(null)
    const [togableBal, setTogableBal] = useState('')
    const [accountBal, setAccountBal] = useState(null)
    const [starBal, setStarBal] = useState('')


    const fetchApi = async () => {
        const accessToken = sessionStorage.getItem("token");
        setBalLoading(true);
        fetch(BaseUrl + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { "account_number": accountNumber }
            )
        })
            .then(response => response.json())
            .then(data => {
                // Data successfully retrieved
                setBalLoading(false);
                if (data.message) { setActfeedback(data.message[0]); }
                else {
                    setAccountBal(data.account.balance);
                    setTogableBal(data.account.balance)
                    setStarBal(data.account.balance.replace(/\d+/g, "*"))
                }

            })
            .catch(error => {
                // Handle any errors
                setBalLoading(false);
                setActfeedback(error)
            });
    }
    useEffect(() => {
        fetchApi()
    }, [accountNumber])
    
return{
    balLoading,
    actfeedback,
    togableBal,
    accountBal,
    starBal,
}

}

export default useGetBalance