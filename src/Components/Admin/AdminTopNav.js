import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminTopNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout functionality here
        navigate('/');
    };

    return (
        <div className="admin-topnav">
            <h1>IQAC Admin</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminTopNav;
