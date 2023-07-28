import { React, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../Components/Nav'
import HomeScreen from '../Components/HomeScreen'
import useGetBalance from '../Hooks/useGetBalance'
import Toast from '../Components/Toast'

const Dashboard = () => {

  //set Use location so as to get user info
  const location = useLocation()
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;

  const [Loading, setLoading] = useState(true);
  const [Actfeedback, setActfeedback] = useState('')
  const [AccountBal, setAccountBal] = useState(null)
  const [starBal, setStarBal] = useState('')
  const [togableBal, setTogableBal] = useState(null)
  
  const apiUrl ="http://127.0.0.1:8000/api";


  const accessToken = sessionStorage.getItem("token");
  //  const 

//get state
  const [message, setMessage] = useState(null)
useEffect(() => {
  if (location.state!==null){
  setMessage(location.state.message)
}
}, [location.state])


//fetch user account balance
  const getBalance = useGetBalance(account_number, "accountDetails")

  const accBal =Number(getBalance.accountBal);

  const fetchApi = async () => {
    setLoading(true);

    fetch(apiUrl + "/accountDetails", {
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
        if (data.message) { setActfeedback(data.message) }
        else {
          setAccountBal(data.account.balance);
          setTogableBal(data.account.balance)
          setStarBal(data.account.balance.replace(/\d+/g, "*"))
        }

      })
      .catch(error => {
        // Handle any errors
        setLoading(false);
        setActfeedback(error)
      });
  }


//call account api
  useEffect(() => {
    fetchApi()
  }, [AccountBal])

  const toggleEye =()=>{
    const inputString =AccountBal;
    if (/\d/.test(togableBal) ===true) {
      setTogableBal(inputString.replace(/\d/g, "*"));   
    }
    else{
      setTogableBal(AccountBal);        
    }
  }
  return (
    <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
     { message!=null &&
      <Toast message={message} />
      }
      <HomeScreen AccountBal={AccountBal} UserDetails={UserDetails} toggleEye={toggleEye} togableBal={togableBal} Loading={Loading}/>
      <Nav/>

    </div>
  )
}

export default Dashboard