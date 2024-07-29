import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar d-flex flex-column vh-100 position-fixed">
            <ul className="list-group flex-grow-1">

                <li className="list-group-item">
                    <Link to="/registeruser">Register User</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/users"> Register Department</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/departments">Department Status</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/approved">Approved Reports</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/pending">Pending Reports</Link>
                </li>
            </ul>
            <div className="footer mt-auto p-3 text-white text-break fst-italic text-center">
                Designed & Developed by CHRIST Infotech
            </div>
        </div>
    );
};

export default AdminSidebar;
