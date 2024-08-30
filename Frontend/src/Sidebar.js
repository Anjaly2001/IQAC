import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar, faCog, faHome, faGears, faEye, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const location = useLocation(); // Hook to get the current path
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [openSections, setOpenSections] = useState({});
  const [userName, setUserName] = useState('Admin'); // Replace with the actual user name logic

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/registerSingleuser') || path.includes('/registerMultipleUser') || path.includes('/listuser') || path.includes('/map')) {
      setOpenSections((prevState) => ({ ...prevState, accounts: true }));
    }
    if (path.includes('/createCampus') || path.includes('/listCampus')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, campus: true }));
    }
    if (path.includes('/academicyear')|| path.includes('/listacademicyear')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, AcademicYear: true }));
    }
    if (path.includes('/eventtype')|| path.includes('/eventtypelist')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, EventType: true }));
    }
    if (path.includes('/createdepartments') || path.includes('/listdepartment')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, department: true }));
    }
    if (path.includes('/createTag') || path.includes('/listTag')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, tagManager: true }));
    }
    if (path.includes('/registerEvent') || path.includes('/addreport') || path.includes('/listevents')) {
      setOpenSections((prevState) => ({ ...prevState, eventStatus: true }));
    }
  }, [location]);

  useEffect(() => {
    // Set a local storage variable when the component mounts
    localStorage.setItem('sidebarOpenSections', JSON.stringify(openSections));
  }, [openSections]);

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const isActive = (path) => location.pathname === path; // Check if the current path matches the link path

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="sidebar text-left fixed">
      <div className="container-fluid mb-6">
        {/* User Info */}

        <a className="text-white fw-bolder fs-4 text-decoration-none">
          CHRIST University<br />
          IQAC | <span className='fw-normal'> EMT</span>
        </a>
        <div className="text-white mt-3">
          Logged in as: <strong>{userName}</strong>
        </div>
        <Nav className="flex-column p-0 mt-5">
          {/* Dashboard */}
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`text-light  fw-bold ${isActive('/dashboard') ? 'active' : ''}`} // Apply active class
            >
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Dashboard
            </Nav.Link>
          </Nav.Item>

          {/* Accounts Section */}
          <Nav.Item>
            <Nav.Link
              className="text-light fw-bold"
              onClick={() => toggleSection('accounts')}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Accounts
            </Nav.Link>
            {openSections.accounts && (
              <Nav className="flex-column ms-3">
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/registerSingleuser"
                    className={`text-light ${isActive('/registerSingleuser') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    New User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/registerMultipleUser"
                    className={`text-light ${isActive('/registerMultipleUser') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    New Users
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/listuser"
                    className={`text-light ${isActive('/listuser') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Users List
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>

          {/* Settings Section */}
          <Nav.Item>
            <Nav.Link
              className="text-light fw-bold"
              onClick={() => toggleSection('settings')}
            >
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </Nav.Link>
            {openSections.settings && (
              <Nav className="flex-column ms-3">
                {/* Campus Section */}
                <Nav.Item>
                  <Nav.Link
                    className="text-light fw-bold"
                    onClick={() => toggleSection('campus')}
                  >
                    <FontAwesomeIcon icon={faGears} className="me-2" />
                    Campus
                  </Nav.Link>
                  {openSections.campus && (
                    <Nav className="flex-column ms-3">
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/createCampus"
                          className={`text-light ${isActive('/createCampus') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          New Campus
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/listCampus"
                          className={`text-light ${isActive('/listCampus') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          Campus List
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>

                {/* Department Section */}
                <Nav.Item>
                  <Nav.Link
                    className={`text-light fw-bold ${isActive('/createdepartments') || isActive('/listdepartment') ? 'active' : ''}`}
                    onClick={() => toggleSection('department')}
                  >
                    <FontAwesomeIcon icon={faGears} className="me-2" />
                    Department
                  </Nav.Link>
                  {openSections.department && (
                    <Nav className="flex-column ms-3">
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/createdepartments"
                          className={`text-light ${isActive('/createdepartments') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          New Department
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/listdepartment"
                          className={`text-light ${isActive('/listdepartment') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          Department List
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>


                {/* Academic Year Section */}
                <Nav.Item>
                  <Nav.Link
                    className="text-light fw-bold"
                    onClick={() => toggleSection('AcademicYear')}
                  >
                    <FontAwesomeIcon icon={faGears} className="me-2" />
                    Academic Year
                  </Nav.Link>
                  {openSections.AcademicYear && (
                    <Nav className="flex-column ms-3">
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/academicyear"
                          className={`text-light ${isActive('/academicyear') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          New Academic Year
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/listacademicyear"
                          className={`text-light ${isActive('/listacademicyear') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                           Academic Year List
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>

                {/* Event Type Section */}
                <Nav.Item>
                  <Nav.Link
                    className={`text-light fw-bold ${isActive('/eventtype')}`}
                    onClick={() => toggleSection('EventType')}
                  >
                    <FontAwesomeIcon icon={faGears} className="me-2" />
                    Event Type
                  </Nav.Link>
                  {openSections.EventType && (
                    <Nav className="flex-column ms-3">
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/eventtype"
                          className={`text-light ${isActive('/eventtype') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          New Event Type
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/eventtypelist"
                          className={`text-light ${isActive('/eventtypelist') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          Event Type List
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>


                {/* Tag Manager Section */}
                <Nav.Item>
                  <Nav.Link
                    className="text-light fw-bold"
                    onClick={() => toggleSection('tagManager')}
                  >
                    <FontAwesomeIcon icon={faGears} className="me-2" />
                    Tag Manager
                  </Nav.Link>
                  {openSections.tagManager && (
                    <Nav className="flex-column ms-3">
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/createTag"
                          className={`text-light ${isActive('/createTag') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Create Tag
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/listTag"
                          className={`text-light ${isActive('/listTag') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          List Tags
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  )}
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>

          {/* Event Status Section */}
          <Nav.Item>
            <Nav.Link
              className="text-light fw-bold"
              onClick={() => toggleSection('eventStatus')}
            >
              <FontAwesomeIcon icon={faCalendar} className="me-2" />
              Events
            </Nav.Link>
            {openSections.eventStatus && (
              <Nav className="flex-column ms-3">
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/registerEvent"
                    className={`text-light ${isActive('/registerEvent') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Register Event
                  </Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/addreport"
                    className={`text-light ${isActive('/addreport') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Report
                  </Nav.Link>
                </Nav.Item> */}

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/listevents"
                    className={`text-light ${isActive('/listevents') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    List Events
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Nav.Item>
        
        {/* Logout Section */}
       <Nav.Item>
            <Nav.Link
              onClick={handleLogout} // Applying the extracted logout logic
              className="text-light fw-bold"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Nav.Link>
          </Nav.Item>
          </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
