import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeadSidebar from './HeadSidebar';
import HeadTopNav from './HeadTopNav';
import Department from './Departments';
import Collaborators from './Collaborator';
import Settings from './Settings';
import Approved from './Approved';
import Pending from './Pending';
import CreateEvent from './CreateEvent';
import './Head.css';

function HeadDashboard() {
  return (
    <div className="head-dashboard">
      <HeadTopNav />
      <div className="head-main">
        <HeadSidebar />
        <div className="head-content">
          <Routes>
            <Route path="/departments" element={<Department />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/approved" element={<Approved />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default HeadDashboard;
