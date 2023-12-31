import React from 'react'
import UserImg from "./../Assets/Images/user.avif"
import {Link} from "react-router-dom"
import RecentTransaction from './RecentTransaction'
import { ProgressBar } from 'react-loader-spinner'

const HomeScreen = ({ UserDetails, AccountBal, toggleEye, togableBal, acctType, Loading, logOut }) => {

  return (
    <div className='w-full  h-[85%] '>
        <div className=" w-full fixed flex-col h-[30%] bg-white flex top-0">

            <div className="flex px-10 h-full gap-2 flex-col mt-2 w-full">
              <div className="w-full flex justify-between items-center h-auto">
                <div className=" h-[100%] aspect-square rounded-sm">
                  <img src={UserImg} alt={UserDetails.name} className='w-[30px] h-auto rounded-sm' />
                </div>
                <div className="h-[100%] aspect-square rounded-sm bg-white flex justify-center items-center">
                 
                    <span className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={logOut}>
                      logout
                    </span>
                 
                </div>
              </div>
            </div>
            <div className="p-4">
            

          <div className="w-full rounded-md bg-[#020216] h-[auto] ">
            <div className="flex justify-between items-center px-2 p-1">
              <div className='text-[#F8F1E9] text-sm '>Balance</div>
              <div>
                <span className="material-symbols-outlined text-[#F8F1E9] text-xl" onClick={toggleEye}>
                  visibility_off
                </span>
              </div>
            </div>
            <div className=' text-center'>
              {
                Loading === true ? <ProgressBar
                  height="70"
                  width="100"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor='none'
                  barColor='#353545'
                /> :

                  <h1 className='text-4xl font-semibold text-[#F8F1E9] text-left w-full px-3 border-none bg-[#020216] text-left' >
                    {togableBal !== null ? togableBal.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0} 
                  </h1>
              
              }
             
            </div>
            <div className="flex justify-between items-center px-2 p-1">
              <div className='text-[#CCCCD0] text-sm'>NGN</div>
            </div>
          </div>


            </div>
        </div>
        <div className="w-full h-[60%] flex mt-[60%] p-5">

        <RecentTransaction />

        </div>
    </div>
  )
}

export default HomeScreen