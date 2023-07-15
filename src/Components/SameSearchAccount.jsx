import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SameSearchAccount = (props) => {
    const recentTrans=props.recent;
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null)
//serach user from recent
    const searchUser= (userInput)=>{
        setSearchInput(userInput.toLowerCase())


     // setSearchResult(recentTrans.filter());
      const filteredAccount = recentTrans.filter((item) => { 
          return (item.account_name.toLowerCase().includes(searchInput) || item.account_number.toLowerCase().includes(searchInput)) && item.bank_name ==='why Go Bank'
      });
      setSearchResult(filteredAccount)
      
    }
   const navigate=useNavigate;
  const transferTo = (accountNumber, bankName, accountName) =>{
   console.log(navigate);
    const TransferAct ={
      account_name: accountName,
      bank_name: bankName,
      account_number: accountNumber

    }
    console.log(TransferAct);
  }

  return (
    <div className='flex my-5 flex-grow w-full h-[200px] overflow-auto flex-col z-50'>
          <input type="text" placeholder='By Name or Account Number' onInput={(e) => { searchUser(e.target.value)}} className='w-full rounded border-0 bg-white block mb-3 sticky top-0'/>
          <div>
          {
            searchResult && searchResult.length>0 ?
            searchResult.map((item, indexNumber)=>(
              < div className="flex p-2 flex-row h-[62px] w-full bg-[#F2EAF9] rounded-sm justify-center mb-2" key={indexNumber} onClick={() => transferTo(item.account_number, item.bank_name, item.account_name)}>

                <div className=' flex-grow h-full flex flex-col justify-center'>
                  <div className="flex-1 text-sm border-b-[0.2px] border-b-[#CCCCD0]-100 font-bold text-[#676773]">{item.account_name}</div>
                  <div className="flex-1 flex flex-row justify-between items-center pr-3">
                    <div className="text-[#CCCCD0] text-[small]">{item.account_number} | {item.bank_name}</div>
                  </div>
                </div>
              </div>
            )):''
          }
          </div>
    </div>
  )
}

export default SameSearchAccount