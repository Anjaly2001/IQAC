import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';
import Departments from './CreateDepartments';
import Users from './Users';
import Approved from './Approved';
import Pending from './Pending';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';
import RegisterUser from './RegisterUser';


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <AdminTopNav />
            <div className="admin-container">
                <AdminSidebar />
                <div className="admin-content">
                    <Routes>
                        <Route path="/registeruser" element={<RegisterUser />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/approved" element={<Approved />} />
                        <Route path="/pending" element={<Pending />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
