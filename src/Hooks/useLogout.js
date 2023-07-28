import { useEffect, useState } from 'react'
import BaseUrl from '../BaseUrl';

const useLogout = (logMeOut, endpoint, onLogoutSuccess) => {
    const accessToken = sessionStorage.getItem('token');
    const logOutApi = async () => {
        if (logMeOut===true){
        fetch(BaseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // log out successful
                //clear storage
                sessionStorage.clear()
                //redirect
                if (typeof onLogoutSuccess === 'function') {
                    onLogoutSuccess();
                }               
            })
            .catch(error => {
                // Handle any errors
            });
    };
    }
    useEffect(() => {
        logOutApi();
    }, [logMeOut]); // Add all dependencies here
}

export default useLogout