import React, { useState } from 'react';
import './HeadDashboard';
import './Head.css';

function Departments() {
  const [department, setDepartment] = useState('');

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleSave = () => {
    // Save department logic
    console.log('Department saved:', department);
  };

  return (
    <div className="departments">
      <h2>Select Department</h2>
      <select value={department} onChange={handleDepartmentChange}>
        <option value="">Select Department</option>
        <option value="department1">Department 1</option>
        <option value="department2">Department 2</option>
        <option value="department3">Department 3</option>
      </select>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Departments;
