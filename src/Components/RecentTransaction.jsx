import { React, useCallback,} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner'
import useRecentTransaction from '../Hooks/useRecentTransaction';
import DateWrapper from './DateWrapper'; 
import AvartarCreator from '../Hooks/AvartarCreator';

const RecentTransaction = () => {
  const navigate = useNavigate();
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;

  const { recent, recentfeedback, recentLoading } = useRecentTransaction('transactionHistory', account_number);

  const recentTransaction = recent;

  let senderName='',  tDate=""; 
  const displayedNames = [];
//redirect to transfer on click
  const navtoPayment = useCallback((RecipientAcct) => {

    // use callback to perform function once
    navigate("/amount", {
      state: RecipientAcct,
      
    });

  }, [navigate]);



  const sendToRecentAct=(id)=>{
    const RecipientAcct = {
      account_number: recentTransaction[id].receiver_account_number,
      account_name: recentTransaction[id].reciever_account_name,
      bank_code: "",
      bank_name: recentTransaction[id].reciever_bank_name,
    };
    navtoPayment(RecipientAcct)
  }


  return (
    <div className='w-full'>
      <div className="h-[90%] overflow-y-auto flex flex-col gap-4 scroll-smooth">

        { 
          recentLoading === true ? < div className="flex flex-row h-full w-full"> <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='none'
            barColor='#ffffff'
          /> </div> :
            recentTransaction.length <1 ?'No Transaction':
              recentTransaction.map((transaction, index) => {
                  // Check if the name is already in the array of displayed names
                  const isNameDisplayed = displayedNames.includes(transaction.reciever_account_name);

                  // If the name is already displayed, return null to skip rendering this item
                  if (isNameDisplayed) {
                    return null;
                  }

                  // If the name is not yet displayed, add it to the array of displayed names
                  displayedNames.push(transaction.reciever_account_name);

                
                tDate = new Date(transaction.created_at) ;
                  return (

                    transaction.mode.toLowerCase() === 'credit' ?

              < div className="flex p-2 flex-row h-[62px] w-full bg-[#F8F4FC] rounded-sm gap-3 justify-center" key={index}>
                        <div className="bg-[#DECBF1] text-[#F8F4FC] font-bold rounded-sm text-3xl w-[50px] aspect-square flex justify-center items-center">{<AvartarCreator UserName={transaction.reciever_account_name} />}</div>
                <div className=' flex-grow h-full flex flex-col justify-center'>
                          <div className="flex-1 text-[11px]  font-semibold border-b-[0.2px] border-b-[#CCCCD0]-100">{transaction.reciever_account_name} </div>
                  <div className="flex-1 flex flex-row justify-between items-center pr-3">
                            <div className="text-[#CCCCD0] text-[10px]">{
                              <DateWrapper key={index} tDate={tDate} />
                            }</div>
                    <Link className="text-[#ccccd0] text-[10px]" to={`../ViewTransaction/${transaction.id}`}>View</Link>
                  </div>
                </div>
              </div>
                      :
              < div className="flex p-2 flex-row h-[62px] w-full bg-[#F8F1E9] rounded-sm gap-3 justify-center" key={index}>
                        <div className="bg-[#E6CCCE] text-[#F8F4FC] font-bold rounded-sm text-3xl w-[50px] aspect-square flex justify-center items-center">{<AvartarCreator UserName={transaction.reciever_account_name} />}</div>
                <div className=' flex-grow h-full flex flex-col justify-center'>
                          <div className="flex-1 border-b-[0.2px] text-[11px] font-semibold border-b-[#CCCCD0]-100 text-[#81020C] capitalize ">{transaction.reciever_account_name}</div>
                  <div className="flex-1 flex flex-row justify-between items-center pr-3">
                            <div className="text-[#CCCCD0] text-[10px]">{
                              <DateWrapper key={index} tDate={tDate} />
                            }</div>
                            <Link className="text-[#ccccd0] text-[10px]" to={`../ViewTransaction/${transaction.id}`}>View</Link>
                            <div className="text-[#ccccd0] text-[10px]" onClick={() => sendToRecentAct(index)}>
                              <span className="material-symbols-outlined text-lg">
                                send_money
                              </span>
                            </div>
                  </div>
                </div>
              </div>

                );
                })
              


}


      </div>
    </div>


  )
}

export default RecentTransaction


