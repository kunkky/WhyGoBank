import { React, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../Components/Nav'
import HomeScreen from '../Components/HomeScreen'


const Dashboard = () => {

  let endPoint="";
  //set Use location so as to get user info
  const location = useLocation()
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;

  const [Loading, setLoading] = useState(true);
  const [Actfeedback, setActfeedback] = useState('')
  const [recentfeedback, setRecentfeedback] = useState('')
  const [AccountBal, setAccountBal] = useState(null)
  const [toggletype, settoggletype] = useState('text')
  const [recentLoading, setRecentLoading] = useState(true)
  
  const [recent, setRecent] = useState([])

  const apiUrl ="http://127.0.0.1:8000/api";


  const accessToken = sessionStorage.getItem("token");
  const fetchApi = async () => {
    setLoading(true);

    fetch(apiUrl +'/accountDetails', {
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
        setLoading(false);
        data.message ? setActfeedback(data.message) : setAccountBal(data.account.balance)        
      })
      .catch(error => {
        // Handle any errors
        setLoading(false);
        setActfeedback(error)
      });
  }

  //  const 
  const fetchRecent = async () => {
  setRecentLoading(true);

  fetch(apiUrl + '/transactionHistory', {
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
      setRecentLoading(false);
      data.message ? setRecentfeedback(data.message) : setRecent(data.transactions)
    })
    .catch(error => {
      // Handle any errors
      setRecentLoading(false);
      console.log(error);
    });
}
//call account api
  useEffect(() => {
    fetchApi()
  },[])

  //recent transactions
  useEffect(() => {
    fetchRecent()
  }, [])

  const toggleEye =()=>{
    toggletype === 'text' ? settoggletype('password') : settoggletype('text')
  }
  return (
    <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
      <HomeScreen AccountBal={AccountBal} Recent={recent} UserDetails={UserDetails} toggleEye={toggleEye} acctType={toggletype} recentLoading={recentLoading} Loading={Loading}/>
      <Nav/>
    </div>
  )
}

export default Dashboard