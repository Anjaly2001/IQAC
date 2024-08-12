import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUsers, faIdBadge, faUniversity, faCalendar, faTags, faHandPointRight } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faBars} className="me-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faIdBadge} className="me-2" />
            Department
          </Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/createdepartments" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Create Department
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listdepartment" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Department List
              </Nav.Link>
            </Nav.Item>
            {/* Add other Department links here */}
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Accounts
          </Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/registerSingleuser" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Create User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/registerMultipleUser" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Create Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listuser" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                List User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/map" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Map User / Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faUniversity} className="me-2" />
            Campus
          </Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/createCampus" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Create Campus
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listCampus" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                List Campus
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faCalendar} className="me-2" />
            Event
          </Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/registerEvent" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Register Events
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listevents" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Events
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/addreport" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Add Report
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="" className="text-light fw-bold">
            <FontAwesomeIcon icon={faTags} className="me-2" />
            Tag
          </Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              {/* <Nav.Link as={Link} to="/listtags" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                List Tags
              </Nav.Link> */}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/tagmanager" className="text-light">
                <FontAwesomeIcon icon={faHandPointRight} className="me-2" />
                Tag Manager
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
