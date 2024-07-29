import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';
import Departments from './Departments';
import Users from './Users';
import Settings from './Settings';
import Approved from './Approved';
import Pending from './Pending';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <AdminTopNav />
            <div className="admin-container">
                <AdminSidebar />
                <div className="admin-content">
                    <Routes>
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/approved" element={<Approved />} />
                        <Route path="/pending" element={<Pending />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
