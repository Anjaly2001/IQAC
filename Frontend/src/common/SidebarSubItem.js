import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SidebarSubItem = ({ path, icon, label, isActive }) => {
  return (
    <Nav.Item>
      <Nav.Link as={Link} to={path} className={`text-light fs-7 ${isActive ? 'active' : ''}`}>
        <FontAwesomeIcon icon={icon} className="me-2" />
        {label}
      </Nav.Link>
    </Nav.Item>
  );
};

export default SidebarSubItem;
