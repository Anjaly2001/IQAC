// src/components/Common/Header.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored user data here (if any)
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar fixed-top" style={{ backgroundColor: '#1e3a8a' }}>
                <div className="container-fluid mb-3">
                    <a className="text-white fw-bolder fs-4 text-decoration-none">
                        CHRIST University<br/>
                        IQAC | <span className='fw-normal'> EMT</span>
                    </a>
                    {/* <button 
                        className="d-flex btn btn-outline-light" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button> */}
                </div>
            </nav>
            <footer className="text-white text-center py-3" style={{ backgroundColor: '#1e3a8a', position: 'fixed', bottom: 0, width: '100%' }}>
                © 2024 Designed and Developed by CHRIST Infotech. All rights reserved.
            </footer>
        </>
    );
};

export default Header;
