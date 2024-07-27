import React from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

const UserTopNav = () => {
  const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout functionality here
        navigate('/');
    };

    return (
        <div className="User-topnav">
            <h1> Internal Quality Assurance Cell - RMT </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserTopNav;
