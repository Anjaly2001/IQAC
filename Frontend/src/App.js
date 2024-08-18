import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Accounts/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Dashboard from './Components/Admin/Dashboard'
import Sidebar from './Sidebar';
import Createdepartments from './Components/Department/CreateDepartments';
import ListDepartment from './Components/Department/ListDepartment';
import UpdateDepartment from './Components/Department/UpdateDepartment';
import Users from './Components/Admin/Users';
import RegisterSingleUser from './Components/Accounts/RegisterSingleUser';
import RegisterMultipleUser from './Components/Accounts/RegisterMultipleUser';
import CreateCampus from './Components/Campus/Create';
import ListCampus from './Components/Campus/List';
import RegisterEvent from './Components/Event/RegisterEvent';
import ListEvents from './Components/Event/ListEvents';
import AddReport from './Components/Event/AddReport';
import ListUser from './Components/Accounts/ListUser';
import Map from './Components/Accounts/Map';
import TagManager from './Components/Tag/TagManager';
import CreateTag from './Components/Tag/CreateTag';
import ListTag from './Components/Tag/ListTag';

const App = () => {
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={
                    <>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/sidebar" element={<Sidebar />} />
                            <Route path="/registerSingleuser" element={<RegisterSingleUser />} />
                            <Route path="/registerMultipleUser" element={<RegisterMultipleUser />} />
                            <Route path="/listUser" element={<ListUser />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/listCampus/*" element={<ListCampus />} />
                            <Route path="/createCampus/*" element={<CreateCampus />} />
                            <Route path="/createdepartments/*" element={<Createdepartments />} />
                            <Route path="/listdepartment/*" element={<ListDepartment />} />
                            <Route path="/updatedepartment" element={<UpdateDepartment />} />
                            <Route path="/registerEvent" element={<RegisterEvent />} />
                            <Route path="/listevents" element={<ListEvents />} />
                            <Route path="/addreport" element={<AddReport />} />
                            <Route path="/tagmanager" element={<TagManager />} />
                            <Route path="/createtag" element={<CreateTag />} />
                            <Route path="/listtag" element={<ListTag />} />
                        </Routes>
                    </>
                } />
            </Routes>
        </Router>
    );
};

export default App;
