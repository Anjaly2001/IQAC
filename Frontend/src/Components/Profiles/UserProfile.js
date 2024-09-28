import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar';

const UserProfile = ({ role }) => {
  const [user, setUser] = useState({
    name: '',
    empId: '',
    email: '',
    phone: '',
    campus: '',
    department: '',
    eventsConducted: 0,
    events: []
  });
  
  // Additional state to handle dropdown selections
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');

  useEffect(() => {
    // Mocking user data fetch
    const loggedInUser = {
      name: 'Alwin Joseph',
      empId: 'CUL123',
      email: 'alwin@christuniversity.in',
      phone: '+91 9876543210',
      campus: 'Pune Lavasa Campus',
      department: 'Computer Science',
      eventsConducted: 5,
      events: [
        { title: 'Tech Fest 2024', date: '2024-05-10' },
        { title: 'AI Workshop', date: '2024-04-12' },
        { title: 'Cyber Security Seminar', date: '2024-03-15' },
        { title: 'Data Science Bootcamp', date: '2024-02-20' },
        { title: 'Hackathon 2024', date: '2024-01-25' }
      ]
    };
    setUser(loggedInUser);
  }, []);

  const viewEvents = () => {
    alert(
      user.events
        .map((event, index) => `${index + 1}. ${event.title} on ${event.date}`)
        .join('\n')
    );
  };

  const renderRoleBasedView = () => {
    switch (role) {
      case 'HOD':
        return (
          <>
            <div className="mb-3">
              <label>Select User</label>
              <select className="form-control" onChange={e => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                <option value="User1">User 1</option>
                <option value="User2">User 2</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={viewEvents}>View</button>
          </>
        );
      case 'IQAC':
      case 'CampusViewer':
      case 'CampusAdmin':
        return (
          <>
            <div className="mb-3">
              <label>Select Department</label>
              <select className="form-control" onChange={e => setSelectedDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Select User</label>
              <select className="form-control" onChange={e => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                <option value="User1">User 1</option>
                <option value="User2">User 2</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={viewEvents}>View</button>
          </>
        );
      case 'Admin':
      case 'UniversityViewer':
        return (
          <>
            <div className="mb-3">
              <label>Select Campus</label>
              <select className="form-control" onChange={e => setSelectedCampus(e.target.value)}>
                <option value="">Select Campus</option>
                <option value="Pune">Pune Lavasa</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Select Department</label>
              <select className="form-control" onChange={e => setSelectedDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Select User</label>
              <select className="form-control" onChange={e => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                <option value="User1">User 1</option>
                <option value="User2">User 2</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={viewEvents}>View</button>
          </>
        );
      default:
        return (
          <div className="profile-details text-left">
            <div className="mb-3"><strong>Name:</strong> {user.name}</div>
            <div className="mb-3"><strong>Employee ID:</strong> {user.empId}</div>
            <div className="mb-3"><strong>Email:</strong> {user.email}</div>
            <div className="mb-3"><strong>Phone Number:</strong> {user.phone}</div>
            <div className="mb-3"><strong>Campus:</strong> {user.campus}</div>
            <div className="mb-3"><strong>Parent Department:</strong> {user.department}</div>
            <div className="mb-3 d-flex align-items-center">
              <strong>Events Conducted:</strong> {user.eventsConducted}
              <button 
                className="btn btn-primary btn-sm ml-3"
                onClick={viewEvents}
              >
                View
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 d-flex justify-content-center align-items-center">
          <div className="card p-6 w-75">
            <h2 className="mb-4">User Profile</h2>
            {renderRoleBasedView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
