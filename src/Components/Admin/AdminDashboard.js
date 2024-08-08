import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Sidebar';

import CreateDepartments from '../Department/CreateDepartments'
import Users from './Users';

import Tag from '../Tag/Tag';
import RegisterSingleUser from '../Accounts/RegisterSingleUser';
import RegisterMultipleUser from '../Accounts/RegisterMultipleUser';
import CreateCampus from '../Campus/Create'
import ListCampus from '../Campus/List';
import Departments from '../Department/CreateDepartments';
import ListDepartment from '../Department/ListDepartment';
import UpdateDepartment from '../Department/UpdateDepartment';
import RegisterEvent from '../Event/RegisterEvent';
import ListEvents from '../Event/ListEvents';
import AddReport from '../Event/AddReport';






const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            {/* <Header /> */}
            <Sidebar />
            <div style={{ marginLeft: '250px', padding: '20px' }}>
                <Routes>
                    
                    <Route path="/createdepartments" element={<CreateDepartments />} />
                    <Route path="/listdepartment" element={<ListDepartment />} />
                    <Route path="/updatedepartment" element={<UpdateDepartment />} />

                    <Route path="/users" element={<Users />} />
                    <Route path="/tag" element={<Tag />} />
                    <Route path="/registerSingleuser" element={<RegisterSingleUser />} />
                    <Route path="/registerMultipleUser" element={<RegisterMultipleUser />} />
                    <Route path="/createCampus" element={<CreateCampus />} />
                    <Route path="/listCampus" element={<ListCampus />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/registerEvent" element={<RegisterEvent />} />
                    <Route path="/listevents" element={<ListEvents />} />
                    <Route path="/addreport" element={<AddReport />} />

                   
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
