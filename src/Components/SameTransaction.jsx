import { React, useState, useEffect } from 'react'
import BankCode from '../Hooks/BankCode'
import ListBeneficiary from './ListBeneficiary'
import SearchAccount from './SearchAccount'
import RecentTransaction from './RecentTransaction'
import useRecentTransaction from '../Hooks/useRecentTransaction'
import useGetSameBank from '../Hooks/useGetSameBank'

const SameTransaction = (props) => {
  const navtoPayment = props.navtoPayment;
  const [beneFeedback, setBeneFeedback] = useState('')
  const [SameSearchAccount, setSameSearchAccount] = useState('')
  const [Beneficiary, setBeneficiary] = useState('')


  const [listScreen, setListScreen] = useState('recent')
  //fectch apis
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;
  const apiUrl = "http://127.0.0.1:8000/api";
  const accessToken = sessionStorage.getItem("token");

  //fetch recent
  const fetchApi = async () => {

    fetch(apiUrl + '/Beneficiary', {
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
        data.message ? setBeneFeedback(data.message) : setBeneficiary(data)
      })
      .catch(error => {
        // Handle any errors
        setBeneFeedback(error)
      });
  }

useEffect(() => {
  fetchApi()
}, [])

//get all same bank Account
const { whyGoAcct, whyGoAcctError, whyGoAcctloader } = useGetSameBank('sameBankAccounts', account_number);

  const [actInput, setActInput] = useState('')
  const [searchSame, setSearchSame] = useState('')
  const sameActInput=()=>{
    //filter based on input
    const filteredAccount = whyGoAcct.WhyGoBankUsers.filter((item) => {
      return item.fullname.toLowerCase() === actInput.toLowerCase() || item.account_number.toLowerCase() === actInput.toLowerCase() || item.username.toLowerCase() === actInput.toLowerCase()
    });
    setSearchSame(filteredAccount)
  }

  //set Input
  const sameActInputsetter=(e)=>{
  setSearchSame([]);
  setActInput(e.target.value);
  }
  //navigator
  const sendMoney = () => {
    const RecipientAcct = {
      account_number: searchSame[0].account_number,
      account_name: searchSame[0].fullname,
      bank_code: '99999',
      bank_name: "Why Go Bank",
    };
    //go to next page
    navtoPayment(RecipientAcct)
  }

//receent
  const { recent, recentfeedback, recentLoading } = useRecentTransaction('transactionHistory', account_number);

  return (
    <div className='w-full  h-[100%] '>
      <div className=" w-full flex-col h-[70%] flex">

        <h1 className='px-5'>Recipient Account</h1>
        <div className="p-2 flex flex-col">

          <div className="bg-[#F8F4FC] p-2 rounded w-full h-auto flex flex-col justify-between">
            <form action="flex flex-row">
              <h1 className='text-[#9A9AA2] mt-1 px-1 w-full'>Why Go Bank</h1>
              <input value={actInput} type='text' className='font-semibold text-sm border-0 bg-transparent  border-b-2 border-b-slate-400 h-auto w-full' onBlur={sameActInput} onInput={sameActInputsetter} placeholder='Accounnt Name Or Account Number' />
              {
                searchSame.length > 0 ?<>
                  <p className='text-sm'>{searchSame[0].fullname}
                    <br />{searchSame[0].account_number}
                  </p>
                  <button className='bg-[#020216] w-full p-3 rounded-sm text-[#DECBF1] mt-1' onClick={sendMoney}>Next</button>
                </>
                   :<> Account Not Found <br/>
                  <button className='text-center text-[#9A9AA2] p-3 bg-[#F2EAF9] mt-1 w-full' disabled>Next</button>
                    </>
              }
            </form>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow flex  p-2 h-[70%] ">

        <div className="bg-[#F8F4FC] rounded w-full h-auto flex flex-col p-3">
          <div className='flex justify-between items-center border-0 border-b-2 border-b-slate-200'>
            {listScreen === "recent" ? <h1 className='text-[#9A9AA2] border-0 border-b-2 border-b-slate-400 pb-2' onClick={() => (setListScreen('recent'))}>Recents</h1> : <h1 className='text-[#9A9AA2] border-0  pb-2' onClick={() => (setListScreen('recent'))}>Recents</h1>
            }
            {
              listScreen === "beneficiary" ? <h1 className='text-[#9A9AA2] border-0 border-b-2 border-b-slate-400 pb-2' onClick={() => (setListScreen('beneficiary'))}>Beneficiaries</h1> : <h1 className='text-[#9A9AA2] border-0  pb-2' onClick={() => (setListScreen('beneficiary'))}>Beneficiaries</h1>
            }
            {
              listScreen === "search" ? <div className="material-symbols-outlined  border-0 border-b-2 border-b-slate-400 pb-2 text-[#676773]" onClick={() => (setListScreen('search'))}>
                search
              </div> : <div className="material-symbols-outlined text-[#676773] " onClick={() => (setListScreen('search'))}>
                search
              </div>
            }


          </div>
          <div className='h-[auto] w-full flex flex-col'>
            {listScreen === 'recent' ? <RecentTransaction recentLoading={recentLoading} Recent={recent} /> : listScreen === 'beneficiary' ? <ListBeneficiary /> : <SameSearchAccount recent={recent} />}
          </div>
        </div>

      </div>
    </div>

  )
}

export default SameTransaction