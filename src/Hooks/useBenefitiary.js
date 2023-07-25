import { useEffect, useState } from 'react';
import BaseUrl from '../BaseUrl';

const useBenefitiary = (endpoint, account_number) => {
    const [benefitiaryFeedback, setbenefitiaryFeedback] = useState('');
    const [benefitiary, setBenefitiary] = useState([]);
    const accessToken = sessionStorage.getItem('token');
    const [benefitiaryLoading, setBenefitiaryLoading] = useState(false);

    const fetchbenefitiary = async () => {
        setBenefitiaryLoading(true);
        fetch(BaseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "account_number": account_number }),
        })
            .then(response => response.json())
            .then(data => {
                // Data successfully retrieved
                data.message ? setbenefitiaryFeedback(data.message) : setBenefitiary(data.Beneficiary);
                setBenefitiaryLoading(false);
            })
            .catch(error => {
                // Handle any errors
                setbenefitiaryFeedback(reportError);
                setBenefitiaryLoading(false);
            });
    };

    useEffect(() => {
        fetchbenefitiary();
    }, [endpoint, account_number, accessToken]); // Add all dependencies here
    return {
        benefitiary,
        benefitiaryFeedback,
        benefitiaryLoading,
    };
};

export default useBenefitiary;
