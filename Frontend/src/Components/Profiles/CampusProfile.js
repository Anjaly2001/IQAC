import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar';

const CampusProfile = ({ role }) => {
  // Mock data for campuses, departments, and users (replace with actual API or data fetching logic)
  const campuses = [
    { id: 'Pune', name: 'Pune Lavasa Campus' },
    { id: 'Bangalore', name: 'Bangalore Central Campus' },
  ];

  const departments = {
    Pune: [
      { id: 'CS', name: 'Computer Science' },
      { id: 'IT', name: 'Information Technology' },
    ],
    Bangalore: [
      { id: 'ECE', name: 'Electronics and Communication Engineering' },
      { id: 'Mech', name: 'Mechanical Engineering' },
    ]
  };

  const users = {
    CS: ['Alice', 'Bob', 'Charlie'],
    IT: ['David', 'Eve', 'Frank'],
    ECE: ['George', 'Harry', 'Ivy'],
    Mech: ['Jack', 'Kathy', 'Liam']
  };

  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    if (selectedCampus) {
      setDepartmentOptions(departments[selectedCampus] || []);
      setSelectedDepartment(''); // Reset department when campus changes
      setSelectedUser(''); // Reset user when campus changes
    }
  }, [selectedCampus]);

  useEffect(() => {
    if (selectedDepartment) {
      setUserOptions(users[selectedDepartment] || []);
      setSelectedUser(''); // Reset user when department changes
    }
  }, [selectedDepartment]);

  const renderDetails = () => {
    if (!selectedCampus || !selectedDepartment || !selectedUser) {
      return <p>Please select a campus, department, and user to view details.</p>;
    }

    return (
      <>
        <div className="mb-3">
          <strong>Campus:</strong> {campuses.find(campus => campus.id === selectedCampus)?.name}
        </div>
        <div className="mb-3">
          <strong>Department:</strong> {departments[selectedCampus].find(dept => dept.id === selectedDepartment)?.name}
        </div>
        <div className="mb-3">
          <strong>User:</strong> {selectedUser}
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
            <h2 className="mb-4">Campus Profile</h2>

            <div className="row mb-3">
              {/* Campus Dropdown */}
              <div className="col-md-4">
                <label>Select Campus</label>
                <select
                  className="form-control"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                >
                  <option value="">Select Campus</option>
                  {campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Dropdown */}
              <div className="col-md-4">
                <label>Select Department</label>
                <select
                  className="form-control"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={!selectedCampus}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Dropdown */}
              <div className="col-md-4">
                <label>Select User</label>
                <select
                  className="form-control"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled={!selectedDepartment}
                >
                  <option value="">Select User</option>
                  {userOptions.map((user, index) => (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Display selected details */}
            {renderDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusProfile;
