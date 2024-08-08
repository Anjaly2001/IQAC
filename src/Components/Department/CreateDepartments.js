import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import AdminDashboard from '../Admin/AdminDashboard';

const CreateDepartment = ({ onAddDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [isParent, setIsParent] = useState(false); // New state for checkbox

    const handleCreateDepartment = () => {
        if (departmentName && description && type && location) {
            const newDepartment = { 
                id: Date.now(), 
                name: departmentName, 
                description, 
                type, 
                location,
                isParent // Include the checkbox value
            };
            onAddDepartment(newDepartment);
            setDepartmentName('');
            setDescription('');
            setType('');
            setLocation('');
            setIsParent(false); // Reset checkbox
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5 d-flex justify-content-center">
                    <div className="container mt-3" style={{ maxWidth: '800px' }}>
                        <div className="text-center fw-bold fs-5 mb-4">
                            Create Department
                        </div>
                        <div className="register">
                            <div className="department-actions mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Department Name"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                />
                                <div className="mt-2">
                                    <Editor 
                                        value={description} 
                                        onTextChange={(e) => setDescription(e.htmlValue)} 
                                        style={{ height: '200px' }} 
                                    />
                                </div>
                                <select
                                    className="form-select mt-2"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Choose Type</option>
                                    <option value="Department">Department</option>
                                    <option value="Club">Club</option>
                                    <option value="Center">Center</option>
                                    <option value="Office">Office</option>
                                    <option value="Cell">Cell</option>
                                </select>
                                <select
                                    className="form-select mt-2"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Choose Location</option>
                                    <option value="Christ University Lavasa">Christ University Lavasa</option>
                                    <option value="Christ University Bangalore">Christ University Bangalore</option>
                                    <option value="Christ University Delhi">Christ University Delhi</option>
                                    <option value="Christ University Kengeri Campus">Christ University Kengeri Campus</option>
                                </select>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        id="parentDepartment"
                                        checked={isParent}
                                        onChange={(e) => setIsParent(e.target.checked)}
                                    />
                                    <label htmlFor="parentDepartment" className="ms-2">
                                        Is Parent Department
                                    </label>
                                </div>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={handleCreateDepartment}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartment;
