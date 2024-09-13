import React from 'react';
import { Collapse, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, title, open, toggleSection, children }) => {
  return (
    <Nav.Item>
      <Nav.Link onClick={toggleSection} className="text-light fw-bold">
        <FontAwesomeIcon icon={icon} className="me-2" />
        {title}
      </Nav.Link>
      <Collapse in={open}>
        <Nav className="flex-column ms-3">
          {children}
        </Nav>
      </Collapse>
    </Nav.Item>
  );
};

export default SidebarItem;
