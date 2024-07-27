import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Common/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UserDashboard from './Components/User/UserDashboard';
import HeadDashboard from './Components/Head/HeadDashboard';
import './Styles/App.css';
import Register from './Components/User/Register';
import Collaborators from './Components/User/Collaborators';
import EventReport from './Components/User/EventReport';
import Departments from './Components/Admin/Departments';

import Users from './Components/Admin/Users';
import Approved from './Components/Admin/Approved';
//import Pending from './Components/Admin/Pending';
import Department from './Components/Head/Departments';
import Collaborator from './Components/Head/Collaborator';
import CreateEvent from './Components/Head/CreateEvent';
import Settings from './Components/Head/Settings'; 
import Pendings from './Components/Head/Pending';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                
                <Route path="/collaborators" element={<Collaborators />} />

                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/collaborators" element={<Collaborators />} />
                <Route path="/event-report" element={<EventReport />} />
                <Route path="/departments" element={< Departments/>} />

                <Route path="/head-dashboard" element={<HeadDashboard />} />
                <Route path="/users" element={< Users/>} />
                <Route path="/approved" element={< Approved/>} />
                <Route path="/pending" element={< Pendings/>} />
                <Route path="/department" element={<Department/>} />
                <Route path="/collaborator" element={<Collaborator />} /> 
                <Route path="/createevent" element={<CreateEvent />} />
                <Route path="/setting" element={<Settings />} />
                
               
                

                
            </Routes>
        </Router>
    );
};

export default App;
