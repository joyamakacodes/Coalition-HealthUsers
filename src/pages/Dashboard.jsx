import React from 'react';
import Sidebar from '../components/Sidebar';
import History from '../components/History';
import Profile from '../components/Profile';


const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <History/>
      <Profile/>
    </div>
  )
}

export default Dashboard