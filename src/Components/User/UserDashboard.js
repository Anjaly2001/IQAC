import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import UserTopNav from './UserTopNav';
import Register from './Register';
import EventReport from './EventReport';
import Collaborators from './Collaborators';
import './User.css';


function UserDashboard() {
  return (
    <div className="user-dashboard">
      <UserTopNav />
      <div className="user-main">
        <UserSidebar />
        <div className="user-content">
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
