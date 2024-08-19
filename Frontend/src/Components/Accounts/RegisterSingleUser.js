import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterSingleUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userCampus, setUserCampus] = useState('');

    const createUser = () => {
        if (userName && userEmpId && userEmail && userDepartment && userCampus) {
            // Handle user creation
            setUserName('');
            setUserEmpId('');
            setUserEmail('');
            setUserPhoneNumber('');
            setUserDepartment('');
            setUserCampus('');
        }
    };

    return (
        <div>
            <AdminDashboard />
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">Register User</div>
                            <div className="register mt-5">
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
                                            <label htmlFor="userPhoneNumber">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userPhoneNumber"
                                                placeholder="Phone Number"
                                                value={userPhoneNumber}
                                                onChange={(e) => setUserPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
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
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userDepartment">Parent Department</label>
                                            <select
                                                className="form-select"
                                                id="userDepartment"
                                                value={userDepartment}
                                                onChange={(e) => setUserDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Law">Law</option>
                                                <option value="BBA">BBA</option>
                                                <option value="MBA">MBA</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="Language">Language</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={createUser}
                                    >
                                        Create User
                                    </button>
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
