import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <nav className="navbar bg-blue fixed-top">
            <div className="container-fluid mb-3">
                <a className="text-white fw-bolder fs-4 text-decoration-none">
                    CHRIST University Lavasa <br/>
                    IQAC | <span className='fw-normal'> RMT</span>
                </a>
                <button className="d-flex btn btn-outline-success" type="submit">Logout</button>
            </div>
        </nav>
    );
};

export default Header;
