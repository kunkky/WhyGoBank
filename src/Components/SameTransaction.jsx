import { React, useState } from 'react'
import BankCode from '../Hooks/BankCode'
import RecentList from './RecentList'
import ListBeneficiary from './ListBeneficiary'
import SameSearchAccount from './SameSearchAccount'

const SameTransaction = () => {
  const banks = BankCode.entity
  const [nextBtn, setNextBtn] = useState('disabled');
  const [acctName, setAcctName] = useState('')
  const [recent, setRecent] = useState([
    { account_name: 'Batman adekunle', account_number: 'Justice League', bank_name: "Access Bank" },
    { account_name: 'Hulk ademuyiwa', account_number: '810', bank_name: "GTB Bank" },
    { account_name: 'Flash', account_number: 'Justice League', bank_name: "Fairmoney" },
    { account_name: 'Iron Man', account_number: '8104048887', bank_name: "Access Bank" },
    { account_name: 'Kola Ademuyiwa', account_number: '8023048893', bank_name: "Opay" }
  ])
  const [recentLoading, setRecentLoading] = useState(false)
  const [beneficiary, setBeneficiary] = useState([])
  const [recentLoader, setRecentLoader] = useState(false)
  const [beneFeedback, setBeneFeedback] = useState('')

  const [listScreen, setListScreen] = useState('recent')
  //fectch apis
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;
  const apiUrl = "http://127.0.0.1:8000/api";
  const accessToken = sessionStorage.getItem("token");

  //fetch recent
  const fetchApi = async () => {
    setRecentLoading(true);

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
        setRecentLoading(false);
        data.message ? setBeneFeedback(data.message) : setBeneficiary(data)
      })
      .catch(error => {
        // Handle any errors
        setRecentLoading(false);
        setBeneFeedback(error)
      });
  }




  return (
    <div className='w-full  h-[100%] '>
      <div className=" w-full flex-col h-[70%] flex">

        <h1 className='px-5'>Recipient Account</h1>
        <div className="p-2 flex flex-col">

          <div className="bg-[#F8F4FC] p-2 rounded w-full h-auto flex flex-col justify-between">
            <form action="flex flex-row">
              <input name="bank" id="" className='text-[#9A9AA2] mt-1 px-1 w-full border-0 bg-transparent border-b-2 border-b-slate-400' value='Why Go Bank' disabled/>
              <input type='text' className='font-semibold border-0 bg-transparent  h-auto w-full' value='' placeholder='Accounnt Name' />
              <input type="text" placeholder='Enter 10 digits Account Number' className='text-[#9A9AA2] mt-1 px-1 w-full border-0 bg-transparent border-b-2 border-b-slate-400' />

              <button className='text-center text-[#9A9AA2] p-3 bg-[#F2EAF9] mt-3 w-full' disabled>Next</button>
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
              listScreen === "beneficiary" ? <h1 className='text-[#9A9AA2] border-0 border-b-2 border-b-slate-400 pb-2' onClick={() => (setListScreen('beneficiary'))}>Beneficiaries</h1> : <h1 className='text-[#9A9AA2] border-0  pb-2' onClick={() => (setListScreen('beneficiary'))}>Recents</h1>
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
            {listScreen === 'recent' ? <RecentList /> : listScreen === 'beneficiary' ? <ListBeneficiary /> : <SameSearchAccount recent={recent} />}
          </div>
        </div>

      </div>
    </div>

  )
}

export default SameTransaction