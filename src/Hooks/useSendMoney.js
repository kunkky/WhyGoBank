import { useState, useEffect } from 'react'
import BaseUrl from './../BaseUrl'


const useSendMoney = (url, transactionDetail) => {

    const accessToken = sessionStorage.getItem("token");
    const [apifeedback, setApifeedback] = useState(null)

    
    const fetchApi = async () => {
        if (transactionDetail!==null){
        fetch(BaseUrl + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(
                transactionDetail
            )
        })
            .then(response => response.json())
            .then(data => {
                // Data successfully retrieved
                setApifeedback(data.message)
            })
            .catch(error => {
                // Handle any errors
                setApifeedback(error)
            });
        }
    }

    useEffect(() => {
        fetchApi()
    }, [transactionDetail])
    



    return {
        apifeedback
    }

}



export default useSendMoney