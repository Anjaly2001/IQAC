import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar';

const UserProfile = ({ role }) => {
  // State to hold user data fetched from an API
  const [user, setUser] = useState(null);

  // Additional state to handle dropdown selections
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');

  useEffect(() => {
    // Simulate an API call to fetch the logged-in user's data
    // Replace this with actual API logic to get user data
    const fetchUserData = async () => {
      try {
        // Example API call to get user data (replace with your actual API endpoint)
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const viewEvents = () => {
    if (user && user.events) {
      alert(
        user.events
          .map((event, index) => `${index + 1}. ${event.title} on ${event.date}`)
          .join('\n')
      );
    }
  };

  const renderRoleBasedView = () => {
    if (!user) return <p>Loading user data...</p>;

    switch (user.role) {
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
