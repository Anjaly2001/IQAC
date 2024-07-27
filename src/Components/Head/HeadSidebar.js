import React from 'react';
import { Link } from 'react-router-dom';
import './HeadDashboard'
import './Head.css';

function HeadSidebar() {
  return (
    <div className="head-sidebar">
      <ul>
        <li><Link to="/department">Department</Link></li>
        <li><Link to="/collaborators">Collaborator</Link></li>
        <li><Link to="/setting">Settings</Link></li>
        <li><Link to="/approved">Approved</Link></li>
        <li><Link to="/pending">Pending</Link></li>
        <li><Link to="/createevent">Create Event</Link></li>
      </ul>
    </div>
  );
}

export default HeadSidebar;
