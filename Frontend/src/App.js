import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importing necessary components from react-router-dom for routing
import useAuth from './hooks/useAuth'; // Importing the custom hook for handling authentication
import Login from './Components/Accounts/Login';
import Dashboard from './Components/Admin/Dashboard';
import Sidebar from './Sidebar';
import Createdepartments from './Components/Department/CreateDepartments';
import ListDepartment from './Components/Department/ListDepartment';
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
import AcademicYear from './Components/AcademicYear/CreateAcademicYear';
import EventType from './Components/Event/EventType';
import EventSummary from './Components/Event/EventSummary';
import EventTypeList from './Components/Event/EventTypeList';
import ListAcademicYear from './Components/AcademicYear/ListAcademicYear';
import AddRole from './Components/Role/AddRole';
import EventProposal from './Components/Event/EventProposal';

const App = () => {
    // Fetch authentication status and user role from the custom hook
    const { userRole, isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication status
    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center vh-100'>Loading...</div>;
    }

    // Function to determine where to redirect based on the user's role
    const getDefaultRoute = () => {
        switch (userRole) {
            case 'Admin':
                return '/dashboard'; // Admin users go to the Admin Dashboard
            default:
                return '/login'; // If no role is found, go to the login page
        }
    };

    return (
        <Router>
            <Routes>
                {/* If the user is not authenticated, only allow access to login-related pages */}
                {!isAuthenticated ? (
                    <>
                        {/* Public routes accessible to non-authenticated users */}
                        <Route path="/login" element={<Login />} />
                        {/* Any other route will redirect to the login page */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        {/* Role-based redirection and protected routes */}
                        <Route path="/dashboard" element={userRole === 'Admin' ? <Dashboard /> : <Dashboard />} />

                        {/* Additional routes accessible to all authenticated users */}
              
                        <Route path="/registerSingleuser" element={<RegisterSingleUser />} />
                        <Route path="/registerMultipleUser" element={<RegisterMultipleUser />} />
                        <Route path="/listUser" element={<ListUser />} />
                        <Route path="/addrole" element={<AddRole />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/listCampus/*" element={<ListCampus />} />
                        <Route path="/createCampus/*" element={<CreateCampus />} />
                        <Route path="/createdepartments/*" element={<Createdepartments />} />
                        <Route path="/listdepartment/*" element={<ListDepartment />} />
                        <Route path="/registerEvent" element={<RegisterEvent />} />
                        <Route path="/listevents" element={<ListEvents />} />
                        <Route path="/addreport" element={<AddReport />} />
                        <Route path="/tagmanager" element={<TagManager />} />
                        <Route path="/createtag" element={<CreateTag />} />
                        <Route path="/listtag" element={<ListTag />} />
                        <Route path="/academicyear" element={<AcademicYear />} />
                        <Route path="/listacademicyear" element={<ListAcademicYear />} />
                        <Route path="/eventtype" element={<EventType />} />
                        <Route path="/eventtypelist" element={<EventTypeList />} />
                        <Route path="/eventsummary" component={EventSummary} />
                        <Route path="//* The `eventproposal` route in the provided code is defining a
                        route for the component `EventProposal`. When a user navigates
                        to the `/eventproposal` path in the application, the
                        `EventProposal` component will be rendered on the screen. This
                        component likely contains the functionality related to
                        creating or managing event proposals within the application. */
                        /* The `eventproposal` route in the provided code is defining a
                        route for the component `EventProposal`. When a user navigates
                        to the `/eventproposal` path in the application, the
                        `EventProposal` component will be rendered on the screen. This
                        component likely contains the functionality related to
                        creating or managing event proposals within the application. */
                        eventproposal" component={EventProposal} />

                        {/* Fallback route for authenticated users */}
                        <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
                        <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
