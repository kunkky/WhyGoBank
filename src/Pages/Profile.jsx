import React, { useCallback, useState } from 'react'
import Nav from '../Components/Nav'
import AvartarCreator from '../Hooks/AvartarCreator'
import ProfileDefault from '../Components/ProfileDefault'
import ProfilePin from '../Components/ProfilePin'
import ProfilePassword from '../Components/ProfilePassword'


const Profile = () => {
const [screen, setScreen] = useState('Default')
//set screen for display
  let screenSetter;
useCallback(
 screenSetter = (selectedScreen) => {
    setScreen(selectedScreen);
  },

  [],
)

  const UserDetails = (JSON.parse(sessionStorage.getItem("user"))).user;
  //display message
  return (
    <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
      <div className='h-full w-full flex flex-col'>
        <div className='h-[30%] bg-[#020216] flex justify-center items-center'>
          <div className='bg-[#F8F4FC] w-[30%] h-[100px] rounded-lg flex justify-center items-center uppercase text-5xl font-bold'>
            <AvartarCreator UserName={UserDetails.fullname} />
          </div>
        </div>
        <div className='flex justify-center items-center flex-col capitalize'>
          <div className='font-bold'>{UserDetails.fullname}</div>        
          <div className='text-[#CCCCD0]'>@{UserDetails.username}</div>        
          <div className='text-[#CCCCD0] mt-2 '>Email: <span className='lowercase'> {UserDetails.email}</span></div>        
        </div>
        {
          screen ==='password' ?
            <ProfilePassword />
            :
            screen ==='pin' ? 
              <ProfilePin  />
            :
              <ProfileDefault screenSetter={screenSetter}/>

        }
        
      </div>
      <Nav />

      <div>
      </div>
    </div>
  )
}

export default Profile