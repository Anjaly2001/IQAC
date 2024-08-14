import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const RegisterSingleUser = () => {
    // State variables to manage the form input values
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userCampus, setUserCampus] = useState('');
    const [userStatus, setUserStatus] = useState(true);
    const [customDepartment, setCustomDepartment] = useState('');
    const [customCampus, setCustomCampus] = useState('');

    // Function to handle user creation
    const createUser = () => {
        let department = userDepartment === 'Others' ? customDepartment : userDepartment;
        let campus = userCampus === 'Others' ? customCampus : userCampus;

        if (userName && userEmpId && userEmail && department && campus) {
            // Logic to handle the creation of the user

            // Reset the form fields after user creation
            setUserName('');
            setUserEmpId('');
            setUserEmail('');
            setUserDepartment('');
            setUserCampus('');
            setUserStatus(true);
            setCustomDepartment('');
            setCustomCampus('');
        }
    };

    return (
        <div>
            {/* Admin Dashboard component, could include sidebar and other elements */}
            <AdminDashboard />
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-2 p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">Register Single User</div>
                            <div className="register">
                                <div className="user-actions mb-4">
                                    {/* Form for user registration */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userName">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                placeholder="Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userEmpId">Emp ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userEmpId"
                                                placeholder="Emp ID"
                                                value={userEmpId}
                                                onChange={(e) => setUserEmpId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userEmail">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="userEmail"
                                                placeholder="Email"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userCampus">Campus</label>
                                            <select
                                                className="form-select"
                                                id="userCampus"
                                                value={userCampus}
                                                onChange={(e) => setUserCampus(e.target.value)}
                                            >
                                                <option value="">Select Campus</option>
                                                <option value="Christ University Bangalore Central Campus">Christ University Bangalore Central Campus</option>
                                                <option value="Christ University Bangalore Bannerghatta Road Campus">Christ University Bangalore Bannerghatta Road Campus</option>
                                                <option value="Christ University Bangalore Kengeri Campus">Christ University Bangalore Kengeri Campus</option>
                                                <option value="Christ University Bangalore Yeshwanthpur Campus">Christ University Bangalore Yeshwanthpur Campus</option>
                                                <option value="Christ University Delhi NCR Off Campus">Christ University Delhi NCR Off Campus</option>
                                                <option value="Christ University Pune Lavasa Off Campus">Christ University Pune Lavasa Off Campus</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {userCampus === 'Others' && (
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
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userDepartment">Department</label>
                                            <select
                                                className="form-select"
                                                id="userDepartment"
                                                value={userDepartment}
                                                onChange={(e) => setUserDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                <option value="MSc (Data Science)">MSc (Data Science)</option>
                                                <option value="BSc (Data Science/Honours/Honours with Research)">BSc (Data Science/Honours/Honours with Research)</option>
                                                <option value="BSc (Economics and Analytics/Honours/Honours with Research)">BSc (Economics and Analytics/Honours/Honours with Research)</option>
                                                <option value="Bachelor of Computer Applications (BCA/Honours/Honours with research)">Bachelor of Computer Applications (BCA/Honours/Honours with research)</option>
                                                <option value="LLM (Corporate & Commercial Law)">LLM (Corporate & Commercial Law)</option>
                                                <option value="LLM (Constitutional & Administrative Law)">LLM (Constitutional & Administrative Law)</option>
                                                <option value="BBA LLB (Honours)">BBA LLB (Honours)</option>
                                                <option value="BA LLB (Honours)">BA LLB (Honours)</option>
                                                <option value="MSc (Global Finance & Analytics)">MSc (Global Finance & Analytics)</option>
                                                <option value="BCom (Financial Analytics/Honours/Honours with Research)">BCom (Financial Analytics/Honours/Honours with Research)</option>
                                                <option value="BBA (Business Analytics/Honours/Honours with Research)">BBA (Business Analytics/Honours/Honours with Research)</option>
                                                <option value="BBA (Honours/Honours with Research)">BBA (Honours/Honours with Research)</option>
                                                <option value="MA (English with Digital Humanities)">MA (English with Digital Humanities)</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {userDepartment === 'Others' && (
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
                                    <div className="form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="userStatus"
                                            checked={userStatus}
                                            onChange={(e) => setUserStatus(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="userStatus">Active</label>
                                    </div>
                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={createUser}
                                    >
                                        Create User
                                    </button>
                                    <Link to="/listuser" className="btn btn-secondary mb-3 ms-1">View User List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSingleUser;
