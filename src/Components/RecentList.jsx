import React, { useState } from 'react'
import useRecentTransaction from './../Hooks/useRecentTransaction'


const RecentList = () => {
  const UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const account_number = UserDetails.user.account_number;

  const { recent, recentfeedback, recentLoading } = useRecentTransaction('transactionHistory', account_number);
console.log(recent);
console.log(recentfeedback);
console.log(recentLoading);

  return (
    <div>RecentList here</div>
  )
}

export default RecentList
