import React from 'react'
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner'


const RecentTransaction = (props) => {
  const recentTransaction =props.Recent;
  const recentLoading = props.recentLoading;
  let senderName, fName,space, sName, avartar, tDate; 
  const fDate = (tDate) =>{

    // Create a new Date object using the original date string
    var date = new Date(tDate);

    // Format the date
    var formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    // Format the time
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedTime = `${hours}:${minutes}${ampm}`;

    // Combine the formatted date and time
    var formattedDateTime = `${formattedDate} | ${formattedTime}`;
    return formattedDateTime;

  }
  return (
    <div className='w-full'>
      <div className="text-sm h-[10%] w-full border-t-2 border-t-[#F8F1E9] ">Transactions</div>
      <div className="h-[90%] overflow-y-auto flex flex-col gap-4 scroll-smooth">

        { 
          recentLoading === true ? < div className="flex flex-row h-full w-full justify-center"> <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='none'
            barColor='#F8F4FC'
          /> </div> :
            recentTransaction.length <1 ?'No Transaction':
            recentTransaction.map((transaction, index) => (
              senderName = transaction.reciever_account_name,
            fName=senderName.slice(0,1),
            space = senderName.search(" "),
            sName= senderName.slice(space, space+1),
            avartar=fName+sName,
            tDate = new Date(transaction.created_at),
            transaction.mode.toLowerCase() === 'credit' ?

              < div className="flex p-2 flex-row h-[62px] w-full bg-[#F8F4FC] rounded-sm gap-3 justify-center" key={index}>
                <div className="bg-[#DECBF1] text-[#F8F4FC] rounded-sm text-3xl w-[55px] aspect-square flex justify-center items-center">{avartar}</div>
                <div className=' flex-grow h-full flex flex-col justify-center'>
                  <div className="flex-1 text-xl border-b-[0.2px] border-b-[#CCCCD0]-100 font-bold">{transaction.mode}</div>
                  <div className="flex-1 flex flex-row justify-between items-center pr-3">
                    <div className="text-[#CCCCD0] text-sm">{fDate(tDate)}</div>
                    <Link className="text-[#ccccd0] text-sm" to={`ViewTransaction\`${transaction.id}`}>View</Link>
                  </div>
                </div>
              </div>
              :
              < div className="flex p-2 flex-row h-[62px] w-full bg-[#F8F1E9] rounded-sm gap-3 justify-center" key={index}>
                <div className="bg-[#E6CCCE] text-[#F8F4FC] rounded-sm text-3xl w-[55px] aspect-square flex justify-center items-center">AA</div>
                <div className=' flex-grow h-full flex flex-col justify-center'>
                  <div className="flex-1 text-xl border-b-[0.2px] border-b-[#CCCCD0]-100 font-bold text-[#81020C] capitalize">{transaction.mode}</div>
                  <div className="flex-1 flex flex-row justify-between items-center pr-3">
                    <div className="text-[#CCCCD0] text-sm">{fDate(tDate)}</div>
                    <Link className="text-[#ccccd0] text-sm" to={`ViewTransaction\`${transaction.id}`}>View</Link>
                  </div>
                </div>
              </div>
            ))
}

      </div>
    </div>

  )
}

export default RecentTransaction


