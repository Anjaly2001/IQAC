import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                // Handle file parsing and user addition here
                // const newUsers = parseCSV(text);
                // setUsers([...users, ...newUsers]);
            };
            reader.readAsText(file);
        }
    };

    const handleViewUsers = () => {
        navigate('/listuser'); // This will navigate to the ListUser page
    };

    return (
        <div>
            <AdminDashboard />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Multiple Users    (Under Development)
                            </div>
                            <div className="register">
                                <div className="form-group mb-4">
                                    <label htmlFor="csvFile">Upload CSV File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="csvFile"
                                        onChange={handleFileChange}
                                    />
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
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-secondary btn-sm w-100"
                                            onClick={handleViewUsers}
                                        >
                                            View Users List
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
