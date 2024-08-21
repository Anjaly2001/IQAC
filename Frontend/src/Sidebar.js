import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar, faCog, faHandPointRight, faHome, faGears, faEye ,faPlus } from '@fortawesome/free-solid-svg-icons';
// import AcademicYear from './Components/AcademicYear/CreateAcademicYear';
// import EventType from './Components/Event/EventType';




function Sidebar() {
  const location = useLocation(); // Hook to get the current path
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    // Check the current path and open the relevant section
    const path = location.pathname;


    if (path.includes('/registerSingleuser') || path.includes('/registerMultipleUser') || path.includes('/listuser') || path.includes('/map')) {
      setOpenSections((prevState) => ({ ...prevState, accounts: true }));
    }
    if (path.includes('/createCampus') || path.includes('/listCampus')) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, campus: true }));
    }
    if (path.includes('/academicyear') ) {
      setOpenSections((prevState) => ({ ...prevState, settings: true, AcademicYear: true }));
    }
    if (path.includes('/eventtype') ) {
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

  return (
    <div className="sidebar text-left  fixed">
      <div className="container-fluid mb-6">
        <a className="text-white fw-bolder fs-4 text-decoration-none">
          CHRIST University<br />
          IQAC | <span className='fw-normal'> EMT</span>
        </a>
        <Nav className="flex-column p-1 mt-5">

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`text-light fw-bold ${isActive('/admin-dashboard') ? 'active' : ''}`} // Apply active class

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
                {/* <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/map"
                  className={`text-light ${isActive('/map') ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                  Map User / Users
                </Nav.Link>
              </Nav.Item> */}
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
                      
                    </Nav>
                  )}
                </Nav.Item>
                
               {/* Event Type Section */}
               <Nav.Item>
                  <Nav.Link
                    className={`text-light fw-bold ${isActive('/eventtype') }`}
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

                <Nav.Item>
                  <Nav.Link
                    className={`text-light fw-bold ${isActive('/createTag') || isActive('/listTag') ? 'active' : ''}`}
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
                          New Tag
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/listTag"
                          className={`text-light ${isActive('/listTag') ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />
                          Tag List
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
              Event
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
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/listevents"
                    className={`text-light ${isActive('/listevents') ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Events List
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/addreport"
                  className={`text-light ${isActive('/addreport') ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                  Create  Report
                </Nav.Link>
              </Nav.Item> */}

              </Nav>
            )}
          </Nav.Item>
        </Nav>
      </div>
      </div>
  );
}

export default Sidebar;
