import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar';

const DepartmentProfile = ({ role }) => {
  // Mock data for departments, members, and events (replace with actual API or data fetching logic)
  const departments = [
    { id: 'DS', name: 'Computer Science', description: 'The Computer Science department focuses on modern technology and computing.', members: ['Agnal', 'Gouthami', 'Prakruthi'], events: ['Tech Fest 2024', 'AI Workshop'] },
    { id: 'IT', name: 'Infotech', description: 'The Information Technology department focuses on software development and network security.', members: ['Anusha', 'Chethan', 'Alanso'], events: ['Power BI Workshop', 'Data Science Bootcamp'] },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentData, setDepartmentData] = useState(null);

  useEffect(() => {
    // When a department is selected, update the department data
    const dept = departments.find(department => department.id === selectedDepartment);
    setDepartmentData(dept);
  }, [selectedDepartment]);

  const renderDepartmentDetails = () => {
    if (!departmentData) {
      return <p>Please select a department to view its details.</p>;
    }

    return (
      <>
        <div className="mb-3">
          <strong>Description:</strong>
          <p>{departmentData.description}</p>
        </div>
        <div className="mb-3">
          <strong>Members:</strong>
          <ul>
            {departmentData.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <strong>Events Conducted:</strong>
          <ul>
            {departmentData.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 d-flex justify-content-center align-items-center">
          <div className="card p-6 w-75">
            <h2 className="mb-4">Department Profile</h2>

            <div className="mb-3">
              <label>Select Department</label>
              <select
                className="form-control"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {renderDepartmentDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentProfile;
