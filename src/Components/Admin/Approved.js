import React from 'react';
import './Admin.css';
import Header from '../Common/Header';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';

function Approved() {
  const departments = ['Department 1', 'Department 2', 'Department 3'];

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <AdminSidebar />
          </div>
          <div className="col-md-10  mt-5 pt-5">
            <div className="container mt-3">
              <div className="text-center fw-bold fs-5 mb-4">
                Approved Reports
              </div>
              <div className="d-flex justify-content-between mb-3">
                <input type="text" className="form-control me-2" placeholder="Event Title" />
                <select className="form-select me-2">
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
                <button className="btn btn-primary">View</button>
              </div>
              {/* Add approved events content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approved;
