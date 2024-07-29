import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeadSidebar from './HeadSidebar';
import Department from './Departments';
import Collaborator from './Collaborator';
import Approved from './ApprovedReport';
import PendingReport from './PendingReport';
import CreateEvent from './CreateEvent';
import './Head.css';
import Header from '../Common/Header';
import RegisterEvent from './RegisterEvent';

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
            <Route path="/registerevent" element={<RegisterEvent />} />
            <Route path="/approved" element={<Approved />} />
            <Route path="/pendingreport" element={<PendingReport/>} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default HeadDashboard;
