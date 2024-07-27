import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';


function UserSidebar() {
  return (
    <div className="user-sidebar">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="list-group-item">
          <Link to="/event-report">Event Report</Link>
        </li>
        <li className="list-group-item">
          <Link to="/collaborators">Collaborators</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;
