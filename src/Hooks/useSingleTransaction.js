import { useEffect, useState } from 'react'
import BaseUrl from '../BaseUrl'

const useSingleTransaction = (url, id) => {

    //set all state
    const [loading, setLoading] = useState(false)
    const [actfeedback, setActfeedback] = useState(null)
    const [transaction, setTransaction] = useState([])


    const fetchApi = async () => {
        const accessToken = sessionStorage.getItem("token");
        setLoading(true);
        fetch(BaseUrl + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { "id": id }
            )
        })
            .then(response => response.json())
            .then(data => {
                // Data successfully retrieved
                setLoading(false);
                if (data.message) { setActfeedback(data.message[0]); }
                else {
                    setTransaction(data.Transaction[0]);
                }

            })
            .catch(error => {
                // Handle any errors
                setLoading(false);
                setActfeedback(error)
            });
    }
    useEffect(() => {
        fetchApi()
    }, [id])

    return {
        loading,
        actfeedback,
        transaction
    }

}

export default useSingleTransaction