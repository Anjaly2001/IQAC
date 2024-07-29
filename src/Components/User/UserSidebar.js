import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';


const UserSidebar = () => {
    return (
        <div className="user-sidebar d-flex flex-column vh-100 position-fixed">
            <ul className="list-group flex-grow-1">
                <li className="list-group-item">
                    <Link to="/register">Create Event</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/eventreport">Event Report</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/reportspending">Reports pending</Link>
                </li>
            </ul>
            <div className="footer mt-auto p-3 text-white text-break fst-italic text-center">
                Designed & Developed by CHRIST Infotech
            </div>
        </div>
    );
};

export default UserSidebar;





