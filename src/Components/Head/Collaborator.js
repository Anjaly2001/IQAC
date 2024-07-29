import React, { useState } from 'react';
import './Head.css';
import Header from '../Common/Header';
import HeadSidebar from './HeadSidebar';

function Collaborators() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleAdd = () => {
    if (name && department) {
      setCollaborators([...collaborators, { name, department }]);
      setName('');
      setDepartment('');
    }
  };

  const handleRemove = () => {
    if (name && department) {
      setCollaborators(collaborators.filter(c => c.name !== name && c.department !== department));
      setName('');
      setDepartment('');
    }
  };

  const handleSave = () => {
    // Save collaborators logic
    console.log('Collaborators:', collaborators);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <HeadSidebar />
          </div>
          <div className="col-md-10">
            <div className="container mt-3">
              <div className="text-center fw-bold fs-5 mb-4">
                Collaborator
              </div>
              <div className="d-flex mb-3">
                <label className="me-2">
                  Name:
                  <input 
                    type="text" 
                    value={name} 
                    onChange={handleNameChange} 
                    className="form-control" 
                    placeholder="Enter Name"
                  />
                </label>
                <label className="me-2">
                  Department:
                  <select value={department} onChange={handleDepartmentChange} className="form-select">
                    <option value="">Select Department</option>
                    <option value="department1">Department 1</option>
                    <option value="department2">Department 2</option>
                  </select>
                </label>
                <button onClick={handleAdd} className="btn btn-primary me-2">Add</button>
                <button onClick={handleRemove} className="btn btn-danger">Remove</button>
              </div>
              <button onClick={handleSave} className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborators;
