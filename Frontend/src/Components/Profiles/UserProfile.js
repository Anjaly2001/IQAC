import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar';

const UserProfile = () => {
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

  useEffect(() => {
    // Fetch user details (mocking it here for simplicity)
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

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 d-flex justify-content-center align-items-center">
          <div className="card p-6 w-75">
            <h2 className="mb-4">User Profile</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
