import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const AdminSidebar = () => {
    return (
      <div className="admin-sidebar">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/departments">Departments</Link>
        </li>
        <li className="list-group-item">
          <Link to="/users">User</Link>
        </li>
        <li className="list-group-item">
          <Link to="/approved">Approved</Link>
        </li>
        <li className="list-group-item">
          <Link to="/pending">Pending</Link>
        </li>
      </ul>
    </div>
    );
};

export default AdminSidebar;

