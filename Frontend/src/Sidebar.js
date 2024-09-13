// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import { Nav } from 'react-bootstrap';
// import './Sidebar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers, faCalendar, faCog, faHome, faGears, faEye, faPlus, faSignOutAlt,faHandshake } from '@fortawesome/free-solid-svg-icons';

// function Sidebar() {
//   const location = useLocation(); // Hook to get the current path
//   const navigate = useNavigate(); // Hook to navigate programmatically
//   const [openSections, setOpenSections] = useState({});
//   const [userName, setUserName] = useState('Admin'); //  {role} Replace with the actual user name logic
//   const [role, setRole] = useState('');


//   useEffect(() => {
//     // Example: fetching role from API or context and updating state
//     // Replace this with your actual logic to fetch role data
//     const userRole = 'Admin'; // Simulating the role. Replace this with actual role data.
//     setRole(userRole);
//   }, []);

//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes('/registerSingleuser') || path.includes('/registerMultipleUser') || path.includes('/listuser') || path.includes('/map')) {
//       setOpenSections((prevState) => ({ ...prevState, accounts: true }));
//     }
//     if (path.includes('/addrole')) {
//       setOpenSections((prevState) => ({ ...prevState, role: true}));
//     }
//     if (path.includes('/createCampus') || path.includes('/listCampus')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, campus: true }));
//     }
//     if (path.includes('/academicyear')|| path.includes('/listacademicyear')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, AcademicYear: true }));
//     }
//     if (path.includes('/eventtype')|| path.includes('/eventtypelist')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, EventType: true }));
//     }
//     if (path.includes('/createdepartments') || path.includes('/listdepartment')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, department: true }));
//     }
//     if (path.includes('/createTag') || path.includes('/listTag')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, tagManager: true }));
//     }
//     if (path.includes('/registerEvent') || path.includes('/addreport') || path.includes('/listevents')) {
//       setOpenSections((prevState) => ({ ...prevState, eventStatus: true }));
//     }
//   }, [location]);

//   useEffect(() => {
//     // Set a local storage variable when the component mounts
//     localStorage.setItem('sidebarOpenSections', JSON.stringify(openSections));
//   }, [openSections]);

//   const toggleSection = (section) => {
//     setOpenSections((prevState) => ({
//       ...prevState,
//       [section]: !prevState[section],
//     }));
//   };

//   const isActive = (path) => location.pathname === path; // Check if the current path matches the link path

//   const handleLogout = () => {
//     // Clear any stored user session or token data
//     localStorage.removeItem('userToken'); // Clear stored token (example)
    
//     console.log('User logged out');
//     navigate('/login'); // Navigate to the login page

//     // Refresh the page to ensure the user is completely logged out
//     window.location.reload(); // This forces the page to reload and prevents access without login
//   };

//   return (
//     <div className="sidebar text-left fixed">
//       <div className="container-fluid mb-6">
//         {/* User Info */}

//         <a className="text-white fw-bolder fs-4 text-decoration-none">
//           CHRIST University<br />
//           IQAC | <span className='fw-normal'> EMT</span>
//         </a>
//         {/* <div className="text-white mt-3">
//           Logged in as: <strong>{userName}</strong>
//         </div> */}
//         <Nav className="flex-column p-0 mt-5">
          
//         {/* Dashboard */}
//       <Nav.Item>
//         <Nav.Link
//           as={Link}
//           to="/dashboard"
//           className={`text-light fw-bold ${isActive('/dashboard') ? 'active' : ''}`}
//         >
//           <FontAwesomeIcon icon={faHome} className="me-2" />

//           {/* Conditional check based on role */}
//           {role === 'Admin' && 'Admin'}
//           {role === 'HOD' && 'HOD'}
//           {role === 'User' && 'User'}
          
//           {/* Alternatively, if no role matches, you can set a default value */}
//           {role !== 'Admin' && role !== 'HOD' && role !== 'User' && 'Guest'} 
//         </Nav.Link>
//       </Nav.Item>

//         {/* Accounts Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('accounts')}
//             >
//               <FontAwesomeIcon icon={faUsers} className="me-2" />
//               Accounts
//             </Nav.Link>
//             {openSections.accounts && (
//               <Nav className="flex-column ms-3">
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerSingleuser"
//                     className={`text-light ${isActive('/registerSingleuser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     New User
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerMultipleUser"
//                     className={`text-light ${isActive('/registerMultipleUser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     New Users
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/listuser"
//                     className={`text-light ${isActive('/listuser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faEye} className="me-2" />
//                     Users List
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>

//           {/* Role Settings Section */}
//            <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold "
//                     onClick={() => toggleSection('role')}
//                   >
//                     <FontAwesomeIcon icon={faHandshake} className="me-2" />
//                    Roles
//                   </Nav.Link>
//                   {openSections.role && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/addrole"
//                           className={`text-light ${isActive('/addrole') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           Add Role
//                         </Nav.Link>
//                       </Nav.Item>
//                       </Nav>
//                   )}
//                 </Nav.Item>



//           {/* Settings Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('settings')}
//             >
//               <FontAwesomeIcon icon={faCog} className="me-2" />
//               Settings
//             </Nav.Link>
//             {openSections.settings && (
//               <Nav className="flex-column ms-3">
//                 {/* Campus Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('campus')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Campus
//                   </Nav.Link>
//                   {openSections.campus && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createCampus"
//                           className={`text-light ${isActive('/createCampus') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Campus
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listCampus"
//                           className={`text-light ${isActive('/listCampus') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Campus List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>

//                 {/* Department Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className={`text-light fw-bold ${isActive('/createdepartments') || isActive('/listdepartment') ? 'active' : ''}`}
//                     onClick={() => toggleSection('department')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Department
//                   </Nav.Link>
//                   {openSections.department && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createdepartments"
//                           className={`text-light ${isActive('/createdepartments') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Department
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listdepartment"
//                           className={`text-light ${isActive('/listdepartment') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Department List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>


//                 {/* Academic Year Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('AcademicYear')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Academic Year
//                   </Nav.Link>
//                   {openSections.AcademicYear && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/academicyear"
//                           className={`text-light ${isActive('/academicyear') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Academic Year
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listacademicyear"
//                           className={`text-light ${isActive('/listacademicyear') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                            Academic Year List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>

//                 {/* Event Type Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className={`text-light fw-bold ${isActive('/eventtype')}`}
//                     onClick={() => toggleSection('EventType')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Event Type
//                   </Nav.Link>
//                   {openSections.EventType && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/eventtype"
//                           className={`text-light ${isActive('/eventtype') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Event Type
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/eventtypelist"
//                           className={`text-light ${isActive('/eventtypelist') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Event Type List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>


//                 {/* Tag Manager Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('tagManager')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Tag Manager
//                   </Nav.Link>
//                   {openSections.tagManager && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createTag"
//                           className={`text-light ${isActive('/createTag') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           Create Tag
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listTag"
//                           className={`text-light ${isActive('/listTag') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           List Tags
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>

//           {/* Event Status Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('eventStatus')}
//             >
//               <FontAwesomeIcon icon={faCalendar} className="me-2" />
//               Events
//             </Nav.Link>
//             {openSections.eventStatus && (
//               <Nav className="flex-column ms-3">
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerEvent"
//                     className={`text-light ${isActive('/registerEvent') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     Register Event
//                   </Nav.Link>
//                 </Nav.Item>

//                 {/* <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/addreport"
//                     className={`text-light ${isActive('/addreport') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     Add Report
//                   </Nav.Link>
//                 </Nav.Item> */}

//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/listevents"
//                     className={`text-light ${isActive('/listevents') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faEye} className="me-2" />
//                     List Events
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>
        
//         {/* Logout Section */}
//        <Nav.Item>
//             <Nav.Link
//               onClick={handleLogout} // Applying the extracted logout logic
//               className="text-light fw-bold"
//             >
//               <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
//               Logout
//             </Nav.Link>
//           </Nav.Item>
//           </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;



// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
// import './Sidebar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers, faCalendar, faCog, faHome, faGears, faEye, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify'; // Import toast for notifications
// import { logout as apiLogout } from '../../../axios/api'; // Import the logout API call
// import useAuth from '../../../hooks/userAuth'; // Import custom hook for authentication

// function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openSections, setOpenSections] = useState({});
//   const [userName, setUserName] = useState('Admin'); // Replace with actual user name logic

//   const { logout } = useAuth(); // Use the logout function from useAuth

//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes('/registerSingleuser') || path.includes('/registerMultipleUser') || path.includes('/listuser') || path.includes('/map')) {
//       setOpenSections((prevState) => ({ ...prevState, accounts: true }));
//     }
//     if (path.includes('/createCampus') || path.includes('/listCampus')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, campus: true }));
//     }
//     if (path.includes('/academicyear') || path.includes('/listacademicyear')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, AcademicYear: true }));
//     }
//     if (path.includes('/eventtype') || path.includes('/eventtypelist')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, EventType: true }));
//     }
//     if (path.includes('/createdepartments') || path.includes('/listdepartment')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, department: true }));
//     }
//     if (path.includes('/createTag') || path.includes('/listTag')) {
//       setOpenSections((prevState) => ({ ...prevState, settings: true, tagManager: true }));
//     }
//     if (path.includes('/registerEvent') || path.includes('/addreport') || path.includes('/listevents')) {
//       setOpenSections((prevState) => ({ ...prevState, eventStatus: true }));
//     }
//   }, [location]);

//   useEffect(() => {
//     localStorage.setItem('sidebarOpenSections', JSON.stringify(openSections));
//   }, [openSections]);

//   const toggleSection = (section) => {
//     setOpenSections((prevState) => ({
//       ...prevState,
//       [section]: !prevState[section],
//     }));
//   };

//   const isActive = (path) => location.pathname === path;

//   // Updated handleLogout function
//   const handleLogout = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refresh_token');
//       if (!refreshToken) {
//         window.localStorage.clear();
//         toast.error('Refresh token not found. Please login again.');
//         navigate('/login');
//         return;
//       }

//       await apiLogout({ refresh_token: refreshToken });
//       logout(); // Clear localStorage and update state
//       toast.success('Logged out successfully!');
//       navigate('/login');
//     } catch (error) {
//       console.error('Failed to logout:', error);
//       toast.error('Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <div className="sidebar text-left fixed">
//       <div className="container-fluid mb-6">
//         {/* User Info */}

//         <a className="text-white fw-bolder fs-4 text-decoration-none">
//           CHRIST University<br />
//           IQAC | <span className='fw-normal'> EMT</span>
//         </a>
//         {/* <div className="text-white mt-3">
//           Logged in as: <strong>{userName}</strong>
//         </div> */}
//         <Nav className="flex-column p-0 mt-5">
//           {/* Dashboard */}
//           <Nav.Item>
//             <Nav.Link
//               as={Link}
//               to="/dashboard"
//               className={`text-light  fw-bold ${isActive('/dashboard') ? 'active' : ''}`} // Apply active class
//             >
//               <FontAwesomeIcon icon={faHome} className="me-2" />
//               Admin
//             </Nav.Link>
//           </Nav.Item>

//           {/* Accounts Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('accounts')}
//             >
//               <FontAwesomeIcon icon={faUsers} className="me-2" />
//               Accounts
//             </Nav.Link>
//             {openSections.accounts && (
//               <Nav className="flex-column ms-3">
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerSingleuser"
//                     className={`text-light ${isActive('/registerSingleuser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     New User
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerMultipleUser"
//                     className={`text-light ${isActive('/registerMultipleUser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     New Users
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/listuser"
//                     className={`text-light ${isActive('/listuser') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faEye} className="me-2" />
//                     Users List
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>

//           {/* Settings Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('settings')}
//             >
//               <FontAwesomeIcon icon={faCog} className="me-2" />
//               Settings
//             </Nav.Link>
//             {openSections.settings && (
//               <Nav className="flex-column ms-3">
//                 {/* Campus Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('campus')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Campus
//                   </Nav.Link>
//                   {openSections.campus && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createCampus"
//                           className={`text-light ${isActive('/createCampus') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Campus
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listCampus"
//                           className={`text-light ${isActive('/listCampus') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Campus List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>

//                 {/* Department Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className={`text-light fw-bold ${isActive('/createdepartments') || isActive('/listdepartment') ? 'active' : ''}`}
//                     onClick={() => toggleSection('department')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Department
//                   </Nav.Link>
//                   {openSections.department && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createdepartments"
//                           className={`text-light ${isActive('/createdepartments') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Department
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listdepartment"
//                           className={`text-light ${isActive('/listdepartment') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Department List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>


//                 {/* Academic Year Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('AcademicYear')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Academic Year
//                   </Nav.Link>
//                   {openSections.AcademicYear && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/academicyear"
//                           className={`text-light ${isActive('/academicyear') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Academic Year
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listacademicyear"
//                           className={`text-light ${isActive('/listacademicyear') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                            Academic Year List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>

//                 {/* Event Type Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className={`text-light fw-bold ${isActive('/eventtype')}`}
//                     onClick={() => toggleSection('EventType')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Event Type
//                   </Nav.Link>
//                   {openSections.EventType && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/eventtype"
//                           className={`text-light ${isActive('/eventtype') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           New Event Type
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/eventtypelist"
//                           className={`text-light ${isActive('/eventtypelist') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           Event Type List
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>


//                 {/* Tag Manager Section */}
//                 <Nav.Item>
//                   <Nav.Link
//                     className="text-light fw-bold"
//                     onClick={() => toggleSection('tagManager')}
//                   >
//                     <FontAwesomeIcon icon={faGears} className="me-2" />
//                     Tag Manager
//                   </Nav.Link>
//                   {openSections.tagManager && (
//                     <Nav className="flex-column ms-3">
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/createTag"
//                           className={`text-light ${isActive('/createTag') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faPlus} className="me-2" />
//                           Create Tag
//                         </Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link
//                           as={Link}
//                           to="/listTag"
//                           className={`text-light ${isActive('/listTag') ? 'active' : ''}`}
//                         >
//                           <FontAwesomeIcon icon={faEye} className="me-2" />
//                           List Tags
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                   )}
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>

//           {/* Event Status Section */}
//           <Nav.Item>
//             <Nav.Link
//               className="text-light fw-bold"
//               onClick={() => toggleSection('eventStatus')}
//             >
//               <FontAwesomeIcon icon={faCalendar} className="me-2" />
//               Events
//             </Nav.Link>
//             {openSections.eventStatus && (
//               <Nav className="flex-column ms-3">
//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/registerEvent"
//                     className={`text-light ${isActive('/registerEvent') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     Register Event
//                   </Nav.Link>
//                 </Nav.Item>

//                 {/* <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/addreport"
//                     className={`text-light ${isActive('/addreport') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faPlus} className="me-2" />
//                     Add Report
//                   </Nav.Link>
//                 </Nav.Item> */}

//                 <Nav.Item>
//                   <Nav.Link
//                     as={Link}
//                     to="/listevents"
//                     className={`text-light ${isActive('/listevents') ? 'active' : ''}`}
//                   >
//                     <FontAwesomeIcon icon={faEye} className="me-2" />
//                     List Events
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//             )}
//           </Nav.Item>
        
//         {/* Logout Section */}
//         <Nav.Item>
//             <Nav.Link
//               onClick={handleLogout} // Applying the extracted logout logic
//               className="text-light fw-bold"
//             >
//               <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
//               Logout
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;



// final one 
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, Button, Collapse } from 'react-bootstrap';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar, faCog, faHome, faGears, faEye, faPlus, faSignOutAlt, faHandshake } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});
  const [role, setRole] = useState('admin'); // Simulated role
  const [userName, setUserName] = useState("");


  useEffect(() => {
    // Simulate fetching user role
    const userRole = 'admin'; // Replace with actual logic
    setRole(userRole);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
    }
  }, []);

  const isActive = (path) => window.location.pathname === path;

  useEffect(() => {
    // Open sections based on the current path
    const path = location.pathname;
    const sectionMap = {
      '/registerSingleuser': 'accounts',
      '/registerMultipleUser': 'accounts',
      '/listuser': 'accounts',
      '/map': 'accounts',
      '/addrole': 'role',
      '/createCampus': 'settings',
      '/listCampus': 'settings',
      '/academicyear': 'settings',
      '/listacademicyear': 'settings',
      '/eventtype': 'settings',
      '/eventtypelist': 'settings',
      '/createdepartments': 'settings',
      '/listdepartment': 'settings',
      '/createTag': 'settings',
      '/listTag': 'settings',
      '/registerEvent': 'eventStatus',
      '/addreport': 'eventStatus',
      '/listevents': 'eventStatus',
    };

    const activeSection = Object.keys(sectionMap).find(key => path.includes(key));
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [sectionMap[activeSection]]: true }));
    }
  }, [location]);

  const toggleSection = section => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className={`sidebar text-left fixed open`}>
      <div className="container-fluid mb-6">
       

        
          <div>
            <span className="text-white fw-bolder fs-4 text-decoration-none">
              CHRIST University<br />
              IQAC | <span className='fw-normal'>EMT</span>
            </span>

            <Nav className="flex-column p-0 mt-5">
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard" className={`text-light fw-bold ${isActive('/dashboard') ? 'active' : ''}`}>
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  {role}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={() => toggleSection('accounts')} className="text-light fw-bold">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Accounts
                </Nav.Link>
                <Collapse in={openSections.accounts}>
                  <Nav className="flex-column ms-3">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/registerSingleuser" className={`text-light ${isActive('/registerSingleuser') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        New User
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/registerMultipleUser" className={`text-light ${isActive('/registerMultipleUser') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        New Users
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/listuser" className={`text-light ${isActive('/listuser') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faEye} className="me-2" />
                        Users List
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={() => toggleSection('role')} className="text-light fw-bold">
                  <FontAwesomeIcon icon={faHandshake} className="me-2" />
                  Roles
                </Nav.Link>
                <Collapse in={openSections.role}>
                  <Nav className="flex-column ms-3">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/addrole" className={`text-light ${isActive('/addrole') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add Role
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={() => toggleSection('settings')} className="text-light fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  Settings
                </Nav.Link>
                <Collapse in={openSections.settings}>
                  <Nav className="flex-column ms-3">
                    {/* Campus */}
                    <Nav.Item>
                      <Nav.Link onClick={() => toggleSection('campus')} className="text-light fw-bold">
                        <FontAwesomeIcon icon={faGears} className="me-2" />
                        Campus
                      </Nav.Link>
                      <Collapse in={openSections.campus}>
                        <Nav className="flex-column ms-3">
                          <Nav.Item>
                            <Nav.Link as={Link} to="/createCampus" className={`text-light ${isActive('/createCampus') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              New Campus
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link} to="/listCampus" className={`text-light ${isActive('/listCampus') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              Campus List
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Collapse>
                    </Nav.Item>

                    {/* Department */}
                    <Nav.Item>
                      <Nav.Link onClick={() => toggleSection('department')} className={`text-light fw-bold ${isActive('/createdepartments') || isActive('/listdepartment') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faGears} className="me-2" />
                        Department
                      </Nav.Link>
                      <Collapse in={openSections.department}>
                        <Nav className="flex-column ms-3">
                          <Nav.Item>
                            <Nav.Link as={Link} to="/createdepartments" className={`text-light ${isActive('/createdepartments') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              New Department
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link} to="/listdepartment" className={`text-light ${isActive('/listdepartment') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              Department List
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Collapse>
                    </Nav.Item>

                    {/* Academic Year */}
                    <Nav.Item>
                      <Nav.Link onClick={() => toggleSection('AcademicYear')} className="text-light fw-bold">
                        <FontAwesomeIcon icon={faGears} className="me-2" />
                        Academic Year
                      </Nav.Link>
                      <Collapse in={openSections.AcademicYear}>
                        <Nav className="flex-column ms-3">
                          <Nav.Item>
                            <Nav.Link as={Link} to="/academicyear" className={`text-light ${isActive('/academicyear') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              New Academic Year
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link} to="/listacademicyear" className={`text-light ${isActive('/listacademicyear') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              Academic Year List
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Collapse>
                    </Nav.Item>

                    {/* Event Type */}
                    <Nav.Item>
                      <Nav.Link onClick={() => toggleSection('eventtype')} className="text-light fw-bold">
                        <FontAwesomeIcon icon={faGears} className="me-2" />
                        Event Type
                      </Nav.Link>
                      <Collapse in={openSections.eventtype}>
                        <Nav className="flex-column ms-3">
                          <Nav.Item>
                            <Nav.Link as={Link} to="/eventtype" className={`text-light ${isActive('/eventtype') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              New Event Type
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link} to="/eventtypelist" className={`text-light ${isActive('/eventtypelist') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              Event Type List
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Collapse>
                    </Nav.Item>

                    {/* Tags */}
                    <Nav.Item>
                      <Nav.Link onClick={() => toggleSection('tags')} className="text-light fw-bold">
                        <FontAwesomeIcon icon={faGears} className="me-2" />
                        Tags
                      </Nav.Link>
                      <Collapse in={openSections.tags}>
                        <Nav className="flex-column ms-3">
                          <Nav.Item>
                            <Nav.Link as={Link} to="/createTag" className={`text-light ${isActive('/createTag') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              New Tag
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link} to="/listTag" className={`text-light ${isActive('/listTag') ? 'active' : ''}`}>
                              <FontAwesomeIcon icon={faEye} className="me-2" />
                              Tag List
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Collapse>
                    </Nav.Item>
                  </Nav>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={() => toggleSection('eventStatus')} className="text-light fw-bold">
                  <FontAwesomeIcon icon={faCalendar} className="me-2" />
                  Events
                </Nav.Link>
                <Collapse in={openSections.eventStatus}>
                  <Nav className="flex-column ms-3">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/registerEvent" className={`text-light ${isActive('/registerEvent') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Register Event
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      {/* <Nav.Link as={Link} to="/addreport" className={`text-light ${isActive('/addreport') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add Report
                      </Nav.Link> */}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/listevents" className={`text-light ${isActive('/listevents') ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faEye} className="me-2" />
                        Events List
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Collapse>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={handleLogout} className="text-light fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        
      </div>
    </div>
  );
};

export default Sidebar;