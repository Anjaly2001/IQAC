import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import Header from '../Common/Header';
import Register from './Register';
import EventReport from './EventReport';
import Collaborators from './Collaborators';
import './User.css';


function UserDashboard() {
  return (
    <div className="">
      <Header />
      <div className="row m-auto">
        <div className='col-3'>
          <UserSidebar />
        </div>
        <div className='col'>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/event-report" element={<EventReport />} />
            <Route path="/collaborators" element={<Collaborators />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
