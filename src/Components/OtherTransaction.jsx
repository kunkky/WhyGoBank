import {React, useEffect, useState } from 'react'
import BankCode from '../Hooks/BankCode'
import RecentList from './RecentList'
import ListBeneficiary from './ListBeneficiary'
import SearchAccount from './SearchAccount'
import ChooseAmount from './ChooseAmount'
import { useNavigate } from 'react-router-dom'

const dummyAct = [
    { account_name: 'Batman adekunle', account_number: 'Justice League', bank_name: "Access Bank" },
    { account_name: 'Hulk ademuyiwa', account_number: '810', bank_name: "GTB Bank" },
    { account_name: 'Flash', account_number: 'Justice League', bank_name: "Fairmoney" },
    { account_name: 'Iron Man', account_number: '8104048887', bank_name: "Access Bank" },
    { account_name: 'Kola Ademuyiwa', account_number: '8023048893', bank_name: "Opay" }
];

const OtherTransaction = (props) => {

    const navtoPayment = props.navtoPayment;
    const banks = BankCode.entity
    const [nextBtn, setNextBtn] = useState('disabled');
    const [acctName, setAcctName] = useState('')
    const [recent, setRecent] = useState(dummyAct)
    const [recentLoading, setRecentLoading] = useState(false)
    const [beneficiary, setBeneficiary] = useState(dummyAct)
    const [recentLoader, setRecentLoader] = useState(false)
    const [beneFeedback, setBeneFeedback] = useState('')
    const [btnCheckControl, setBtnCheckControl] = useState(false)
    const [accountNum, setAccountNum] = useState('')
    const [accountName, setAccountName] = useState(null)
    const [accountNamefeedBack, setAccountNamefeedBack] = useState(null)
    const [accountError, setAccountError] = useState(null)
    const [bankError, setBankError] = useState(null) 
    const [sbankCode, setsBankCode] = useState(null)
    const [bankName, setBankName] = useState(null)
    const [listScreen, setListScreen] = useState('recent')
//fectch apis
    const UserDetails = JSON.parse(sessionStorage.getItem("user"));
    const account_number = UserDetails.user.account_number;
    const apiUrl = "http://127.0.0.1:8000/api";
    const accessToken = sessionStorage.getItem("token");

    
//fetch recent
    const fetchApi = async () => {
        setRecentLoading(true);

        fetch('https://api.paystack.co/bank/resolve?account_number='+accountNum+'&bank_code='+sbankCode, {
            method: 'GET',
            headers: {
                "Authorization":" Bearer sk_live_22a6033702c6faf5c145ee230367418b1516b595",
                'Content-Type': 'application/json',
                "Cache-Control": "no-cache"
            }
        })
            .then(response => response.json())
            .then(data => {
                // Data successfully retrieved
                setRecentLoading(false);

                if(data.status===false){ 
                    setAccountNamefeedBack("Account does not exist")
                    setAccountName(null)
                    setBankName(null)
                }
                else{
                    setAccountNamefeedBack(null)
                    setBtnCheckControl(true)
                    setAccountName(data.data.account_name)
                    
                }
            })
            .catch(error => {
                // Handle any errors
                setRecentLoading(false);
                setAccountName(null)
                setBankName(null)
                setAccountNamefeedBack("please check connection")
            });
    }

    //get input and get account info
    const checkInput=(userInput)=>{
    //use regex to alphaet
        setAccountNum(userInput.replace(/[A-Za-z]/g, ''));
        setAccountError(null)
        setAccountName(null)
        setBtnCheckControl(false) 
        

    }    
    const bankSelectionHandler=(selction)=>{
    setsBankCode(selction)
    setBankError(null)
        setBtnCheckControl(false) 
        checkAccount()
    }

    //check Account
    const checkAccount=()=>{
        if(accountNum.length===10){
            //validate account here

            if (sbankCode === '') {
                setBankError('Choose a Bank')
            }
            else if (accountNum.length !== 10) {
                setAccountError('Account Number must be 10 Digits')
            }
            else {
                //call api

                fetchApi()
                //set button true
                setAccountError(null)

            }


            
        }
        else{
            setBtnCheckControl(false) 
            setAccountError('Account Number must be 10 Digits')
        }
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        const SelBank = banks.filter((item) => item.code === sbankCode)
        setBankName(SelBank[0].name)
       

        if (accountName !== null && accountNum !== null && BankCode !== null && bankName !== null){
        //double check for error
            sendMoney()
        }
    }
    const sendMoney=()=>{
            //get back name
            
      

        const RecipientAcct={
            account_number: accountNum,
            account_name: accountName,
            bank_code: sbankCode,
            bank_name: bankName,
        };
        //go to next page
        navtoPayment(RecipientAcct)
      
    }
  return (
      <div className='w-full  h-[100%] '>
          <div className=" w-full flex-col h-[70%] flex">

              <h1 className='px-5'>Recipient Account</h1>
              <div className="p-2 flex flex-col">

                  <div className="bg-[#F8F4FC] p-2 rounded w-full h-auto flex flex-col justify-between">
                    <form action="flex flex-row" onSubmit={(e)=>submitHandler(e)}>
                      <h1 className='text-[#9A9AA2]'>Select A Bank</h1>
                          <select name="bank" id="" className='text-[#9A9AA2] mt-1 px-1 w-full border-0 bg-transparent border-b-2 border-b-slate-400' onChange={(e)=>bankSelectionHandler(e.target.value)}>
                              <option value="">Choose Bank</option>
                      {banks.sort().map((banks, indexNum)=>(
                          <option value={banks.code} key={indexNum}>{banks.name}</option>
                      ))}
                          
                        
                      </select>
                          <div className='text-sm text-[#81020C]'>{bankError!=="false" && bankError}</div>
                        <input type='text'  className='font-semibold border-0 bg-transparent  h-auto w-full' value={
                              accountNamefeedBack !== null ? accountNamefeedBack : accountName !== null ? accountName :
                              ''
                        }  disabled/>
                          <input type="text" placeholder='Enter 10 digits Account Number' className='text-[#9A9AA2] mt-1 px-1 w-full border-0 bg-transparent border-b-2 border-b-slate-400' value={accountNum} onChange={(e) => { checkInput(e.target.value) }} onBlur={checkAccount}/>
                          <div className='text-sm text-[#81020C]'>{accountError}</div>
                            { 
                              btnCheckControl ===false ? 
                                  <button className='text-center text-[#9A9AA2] p-3 bg-[#F2EAF9] mt-3 w-full' disabled>Next</button>:
                                  <button className='text-center text-[#9A9AA2] p-3 bg-[#020216] mt-3 w-full'>Next</button>
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
                      {listScreen === 'recent' ? <RecentList /> : listScreen === 'beneficiary' ? <ListBeneficiary /> : <SearchAccount recent={recent}/> }
                  </div>
              </div>

          </div>
      </div>

  )
}

export default OtherTransaction