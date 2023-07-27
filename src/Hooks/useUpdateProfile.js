import { useState, useEffect } from 'react'
import BaseUrl from './../BaseUrl'


const useUpdateProfile = (url, newUpdate) => {

    const accessToken = sessionStorage.getItem("token");
    const [updateFeedback, setUpdateFeedback] = useState(null)
    const [updateloading, setUpdateloading] = useState(false)

//get user
    const user = (JSON.parse(sessionStorage.getItem("user"))).user.email;
    const fetchApi = async () => {

        if (newUpdate !== null) {
            setUpdateloading(true)
            fetch(BaseUrl + url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(
                    {
                        newUpdate: newUpdate,
                        user: user,
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                    // Data successfully retrieved
                    setUpdateFeedback(data)
                    setUpdateloading(false)
                })
                .catch(error => {
                    // Handle any errors
                    setUpdateFeedback(error)
                    setUpdateloading(false)
                });
        }
    }

    useEffect(() => {
        fetchApi()
    }, [newUpdate])


    return {
        updateFeedback,
        updateloading
    }

}



export default useUpdateProfile