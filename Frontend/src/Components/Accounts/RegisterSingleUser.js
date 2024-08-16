import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const RegisterSingleUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userCampus, setUserCampus] = useState('');
    const [userStatus, setUserStatus] = useState(true);

    const createUser = () => {
        if (userName && userEmpId && userEmail && userDepartment && userCampus) {
            // Handle user creation
            setUserName('');
            setUserEmpId('');
            setUserEmail('');
            setUserDepartment('');
            setUserCampus('');
            setUserStatus(true);
        }
    };

    return (
        <div>
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

                                                {/* Add options here */}
                                            </select>

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
                                                <option value="">Data Science</option>
                                                <option value="">Law</option>
                                                <option value="">BBA</option>
                                                <option value="">MBA</option>
                                                <option value="">Commerce</option>
                                                <option value="">Language</option>
                                                <option value="">Others</option>
                                                {/* Add options here */}
                                            </select>
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
