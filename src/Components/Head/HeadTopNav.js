import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Head.css';

const HeadTopNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout functionality here
        navigate('/');
    };

    return (
        <div className="head-topnav w-100">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h1 className="admin-title">IQAC Admin</h1>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </div>
        </div>
    );
};

export default HeadTopNav;
