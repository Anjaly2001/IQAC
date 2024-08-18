import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import CreateDepartments from '../Department/CreateDepartments'
import Users from './Users';
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
import ListUser from '../Accounts/ListUser';
import Map from '../Accounts/Map';
import TagManager from '../Tag/TagManager';
import CreateTag from '../Tag/CreateTag';
import ListTag from '../Tag/ListTag';

function AdminDashboard(){
    return (

        <div className="admin-dashboard  mt-5">
            <Sidebar />
            <div style={{ marginLeft: '250px', padding: '20px' }}>
                <Routes>
                    <Route path="/createdepartments/*" element={<CreateDepartments />} />
                    <Route path="/listdepartment/*" element={<ListDepartment />} />
                    <Route path="/updatedepartment" element={<UpdateDepartment />} />
                    <Route path="/registerSingleuser" element={<RegisterSingleUser />} />
                    <Route path="/registerMultipleUser" element={<RegisterMultipleUser />} />
                    <Route path="/listUser" element={<ListUser />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/createCampus/*" element={<CreateCampus />} />
                    <Route path="/listCampus/*" element={<ListCampus />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/registerEvent" element={<RegisterEvent />} />
                    <Route path="/listevents" element={<ListEvents />} />
                    <Route path="/addreport" element={<AddReport />} />
                    <Route path="/tagmanager" element={<TagManager />} />
                    <Route path="/createtag" element={<CreateTag />} />
                    <Route path="/listtag" element={<ListTag />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
