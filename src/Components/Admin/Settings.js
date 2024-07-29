import React from 'react';
import './Admin.css';
import AdminSidebar from './AdminSidebar';
import Header from '../Common/Header';

const Settings = () => {
    return (
        <div className="">
        <Header />
        <div className="row m-auto">
            <div className='col-3'>
                <AdminSidebar />
            </div>
            <div className='col'>
                <div className='text-center fw-bolder fs-5 mt-3 mb-4'>
                    Settings
                </div>
            {/* Add settings content here */}
        </div>
        </div>
        </div>
    );
};

export default Settings;
