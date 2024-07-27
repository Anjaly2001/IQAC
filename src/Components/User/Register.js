import React, { useState } from 'react';
import './UserDashboard'
import './User.css';

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
    <div className="register">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="department1">Department 1</option>
            <option value="department2">Department 2</option>
            <option value="department3">Department 3</option>
          </select>
        </label>
        <label>
          Event Type:
          <input type="text" value={eventType} onChange={(e) => setEventType (e.target.value)} />
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          Venue:
          <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
        </label>
        <label>
          Academic Year:
          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
            <option value="">Select Year</option>
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
              <option key={year} value={`${year}-${year + 1}`}>{year}-{year + 1}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
