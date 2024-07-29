import React from 'react';
import { Link } from 'react-router-dom';
import './Head.css';

function HeadSidebar() {
  return (
    <div className="head-sidebar d-flex flex-column vh-100 position-fixed">
      <ul className="list-group flex-grow-1">
        <li className="list-group-item">
          <Link to="/department">Department</Link>
        </li>
        <li className="list-group-item">
          <Link to="/registerevent">Register Event</Link>
        </li>

        <li className="list-group-item">
          <Link to="/createevent">Create Event</Link>
        </li>
        <li className="list-group-item">
          <Link to="/collaborator">Collaborator</Link>
        </li>
        <li className="list-group-item">
          <Link to="/approvedreport">Approved Reports</Link>
        </li>
        <li className="list-group-item">
          <Link to="/pendingreport">Pending Reports</Link>
        </li>

      </ul>
      <div className="footer mt-auto p-4 text-white text-break fst-italic text-center">
        Designed & Developed by CHRIST Infotech
      </div>
    </div>
  );
}

export default HeadSidebar;
