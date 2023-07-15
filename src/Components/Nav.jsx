import { React, useLayoutEffect } from 'react'
import {NavLink, Link } from 'react-router-dom'


const Nav = () => {
    //check if user is already log in and redirect
    useLayoutEffect(() => {
        document.title = "Dashboard | Number one online bank app"
    }, [])


  return (
      <div className='px-20 bg-white w-full  h-[15%] fixed  bottom-0'>
          <div className='border-t-2 border-t-[#F8F1E9] flex justify-between items-center w-full h-full'>
              <NavLink to='/dashboard' className={({isActive}) => { return isActive ? 'material-symbols-outlined bg-[#020216] p-2 rounded-sm flex justify-center items-center text-[#F8F4FC]' : 'material-symbols-outlined' }}   >
                  home
          </NavLink>

     
              <NavLink to="/transaction" className={({isActive}) => { return isActive ? 'material-symbols-outlined bg-[#020216] p-2 rounded-sm flex justify-center items-center text-[#F8F4FC]' : 'material-symbols-outlined' }}   >
                  send
          </NavLink>
              <NavLink to="/profile" className={({isActive}) => { return isActive ? 'material-symbols-outlined bg-[#020216] p-2 rounded-sm flex justify-center items-center text-[#F8F4FC]' : 'material-symbols-outlined' }}   >
                  person
          </NavLink>
          </div>
      </div>
  )
}

export default Nav