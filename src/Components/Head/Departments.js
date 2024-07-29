import React, { useState } from 'react';
import './HeadDashboard';
import Header from '../Common/Header';
import './Head.css';
import HeadSidebar from './HeadSidebar';

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
    <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <HeadSidebar />
                    </div>
                    <div className="col-md-10  mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Department
                            </div>

              <select value={department} onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                <option value="department1">Department 1</option>
                <option value="department2">Department 2</option>
                <option value="department3">Department 3</option>
              </select>
              <button onClick={handleSave} className="btn btn-primary mt-2">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Departments;
