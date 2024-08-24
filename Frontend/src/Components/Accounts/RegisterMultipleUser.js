import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);
<<<<<<< HEAD
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCampus, setSelectedCampus] = useState('');
    const [customDepartment, setCustomDepartment] = useState('');
    const [customCampus, setCustomCampus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments();
        fetchCampuses();
    }, []);

    const fetchDepartments = async () => {
        const mockDepartments = [
            { id: 1, name: 'MA (English with Digital Humanities)' },
            { id: 2, name: 'BBA (Business Analytics/Honours/Honours with Research)' },
            // ...more departments
            { id: 16, name: 'Others' },
        ];
        setDepartments(mockDepartments);
    };

    const fetchCampuses = async () => {
        const mockCampuses = [
            { id: 1, name: 'Christ University Bangalore Central Campus' },
            { id: 2, name: 'Christ University Bangalore Bannerghatta Road Campus' },
            // ...more campuses
            { id: 7, name: 'Others' },
        ];
        setCampuses(mockCampuses);
    };
=======
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf

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

<<<<<<< HEAD
    const handleViewUsers = () => {
        navigate('/listuser');
    };

=======
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
    return (
        <div>
            <AdminDashboard />
            <div className="container-fluid">
                <div className="row">
<<<<<<< HEAD
                    <div className="col-md-2 p-0">
                        {/* Placeholder for Sidebar or other components */}
=======
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Users
                            </div>
                            <div className="register">
<<<<<<< HEAD
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="department">Select Department</label>
                                            <select
                                                className="form-select"
                                                id="department"
                                                value={selectedDepartment}
                                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                {departments.map(department => (
                                                    <option key={department.id} value={department.name}>
                                                        {department.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedDepartment === 'Others' && (
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Enter Department"
                                                    value={customDepartment}
                                                    onChange={(e) => setCustomDepartment(e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="campus">Select Campus</label>
                                            <select
                                                className="form-select"
                                                id="campus"
                                                value={selectedCampus}
                                                onChange={(e) => setSelectedCampus(e.target.value)}
                                            >
                                                <option value="">Select Campus</option>
                                                {campuses.map(campus => (
                                                    <option key={campus.id} value={campus.name}>
                                                        {campus.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedCampus === 'Others' && (
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Enter Campus"
                                                    value={customCampus}
                                                    onChange={(e) => setCustomCampus(e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>
=======
                                
                                {/* Add "Download CSV Format" link here */}
                                <div className="d-flex justify-content-end mb-2">
                                    {/* Replace `#` with the actual link to download the CSV format */}
                                    <a href="#" className="text-primary">
                                        Download CSV Format
                                    </a>
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
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
