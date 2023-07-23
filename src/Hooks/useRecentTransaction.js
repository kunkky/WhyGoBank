import { React, useEffect, useState } from 'react'
import BaseUrl from '../BaseUrl';

const useRecentTransaction = (endpoint, account_number ) => {
    const [recentfeedback, setRecentfeedback] = useState('')
    const [recent, setRecent] = useState([])
    const accessToken = sessionStorage.getItem("token");
    const [recentLoading, setRecentLoading] = useState(false);

    const fetchRecent = async () => {
        setRecentLoading(true);
        fetch(BaseUrl + endpoint, {
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
                data.message ? setRecentfeedback(data.message) : setRecent(data.transactions)
                setRecentLoading(false)
            })
            .catch(error => {
                // Handle any errors
                setRecentfeedback(reportError) 
                setRecentLoading(false)
            });
    }

    useEffect(() => {
        fetchRecent()
    }, [account_number, endpoint])

    return (
        {
            recent,
            recentfeedback,
            recentLoading

        }
    )
}


export default useRecentTransaction