// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard" className="text-light fw-bold">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/department" className="text-light fw-bold">Department</Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/createdepartments" className="text-light">Create Department</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listdepartment" className="text-light">List Department</Nav.Link>
            </Nav.Item>
            {/* Add other Department links here */}
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/accounts" className="text-light fw-bold">Accounts</Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/registerSingleuser" className="text-light">Create User</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/registerMultipleUser" className="text-light">Create Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/registerMultipleUser" className="text-light">Map User / Users</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/campus" className="text-light fw-bold">Campus</Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/listCampus" className="text-light">List Campus</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/createCampus" className="text-light">Create Campus</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/event" className="text-light fw-bold">Event</Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/registerEvent" className="text-light">Register Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/listevents" className="text-light">Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/addreport" className="text-light">Add Report</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/tag" className="text-light fw-bold">Tag</Nav.Link>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/list-tag" className="text-light">List Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/create-tag" className="text-light">Create Tag</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
