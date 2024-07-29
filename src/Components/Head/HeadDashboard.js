import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeadSidebar from './HeadSidebar';
import Department from './Departments';
import Collaborator from './Collaborator';
import Settings from './Settings';
import Approved from './ApprovedReport';
import Pending from './PendingReport';
import CreateEvent from './CreateEvent';
import './Head.css';
import Header from '../Common/Header';

function HeadDashboard() {
  return (
    
    <div className="head-dashboard">
      <Header />
      <div className="head-main">
        <HeadSidebar />
        <div className="head-content">
          <Routes>
            <Route path="/department" element={<Department />} />
            <Route path="/collaborator" element={<Collaborator />} />
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
