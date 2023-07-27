import React from 'react'

const ProfileDefault = (props) => {
   const screenSetterHandler = props.screenSetter;
  return (
      <div className="p-10 mt-5">
          <button className='w-full p-3 bg-[#DECBF1] rounded text-[#020216] font-bold mb-5 hover:bg-[#020216] hover:text-[#DECBF1]' onClick={() => screenSetterHandler('password', null)}>Change Password</button>
          <button className='w-full p-3 bg-[#DECBF1] rounded text-[#020216] font-bold mb-5 hover:bg-[#020216] hover:text-[#DECBF1]' onClick={() => screenSetterHandler('pin', null)}>Change Transaction PIN</button>
      </div>
  )
}

export default ProfileDefault