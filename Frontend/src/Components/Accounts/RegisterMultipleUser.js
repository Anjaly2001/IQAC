import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                // Handle file parsing and user addition here
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <AdminDashboard />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Users
                            </div>
                            <div className="register">
                                
                                {/* Add "Download CSV Format" link here */}
                                <div className="d-flex justify-content-end mb-2">
                                    {/* Replace `#` with the actual link to download the CSV format */}
                                    <a href="#" className="text-primary">
                                        Download CSV Format
                                    </a>
                                </div>
                                
                                <div className="form-group mb-6">
                                    <label htmlFor="csvFile">Upload CSV File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="csvFile"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                
                                {/* Disclaimer below the file upload */}
                                <div className="text-muted mb-6">
                                    The file should include the following columns: Name, Emp ID, Email, Phone Number, Campus, Department.
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary btn-sm w-100"
                                            onClick={handleFileUpload}
                                        >
                                            Upload CSV File
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterMultipleUser;
