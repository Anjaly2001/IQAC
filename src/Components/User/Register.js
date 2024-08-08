import React, { useState } from 'react';
import './User.css';
import UserSidebar from './UserSidebar';
import Header from '../Common/Header';

function Register() {
  const [department, setDepartment] = useState('');
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [academicYear, setAcademicYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log({ department, eventType, startDate, endDate, venue, academicYear });
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-3">
          <UserSidebar />
        </div>
        <div className="col mt-5 pt-5">
          <div className="container">
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Registration Form
              <hr />
            </div>
            <form onSubmit={handleSubmit} className=''>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select
                  id="department"
                  className="form-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="department1">Department 1</option>
                  <option value="department2">Department 2</option>
                  <option value="department3">Department 3</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="eventType" className="form-label">Event Name / Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className='row m-quto'>
                <div className='col-6'>
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">End Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="venue" className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="academicYear" className="form-label">Academic Year</label>
                <select
                  id="academicYear"
                  className="form-select"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
                    <option key={year} value={`${year}-${year + 1}`}>{year}-{year + 1}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
