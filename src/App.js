import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Common/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UserDashboard from './Components/User/UserDashboard';
import HeadDashboard from './Components/Head/HeadDashboard';
import Register from './Components/User/Register';
import Collaborators from './Components/User/Collaborators';
import EventReport from './Components/User/EventReport';
import Departments from './Components/Admin/CreateDepartments';
import Users from './Components/Admin/Users';
import Approved from './Components/Admin/Approved';
import Pending from './Components/Admin/Pending';
import Department from './Components/Head/Departments';
import Collaborator from './Components/Head/Collaborator';
import CreateEvent from './Components/Head/CreateEvent';
import PendingReport from './Components/Head/PendingReport';
import ApprovedReport from './Components/Head/ApprovedReport';
import RegisterUser from './Components/Admin/RegisterUser';
import RegisterEvent from './Components/Head/RegisterEvent';
import ReportsPending from './Components/User/ReportsPending';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/registeruser" element={<RegisterUser />} />
                <Route path="/approved" element={<Approved />} />
                <Route path="/collaborators" element={<Collaborators />} />
                <Route path="/pending" element={<Pending />} />

                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/collaborators" element={<Collaborators />} />
                <Route path="/eventreport" element={<EventReport />} />
                <Route path="/departments" element={< Departments/>} />
                <Route path="/reportspending" element={< ReportsPending/>} />


                <Route path="/head-dashboard" element={<HeadDashboard />} />
                <Route path="/users" element={< Users/>} />
                <Route path="/registerevent" element={<RegisterEvent />} />
                <Route path="/approvedreport" element={< ApprovedReport/>} />
                <Route path="/pendingreport" element={< PendingReport/>} />
                <Route path="/department" element={<Department/>} />
                <Route path="/collaborator" element={<Collaborator />} /> 
                <Route path="/createevent" element={<CreateEvent />} />
                
                
               
                

                
            </Routes>
        </Router>
    );
};

export default App;
