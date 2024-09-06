import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown'; // Assuming you use PrimeReact for dropdowns
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from '../Admin/AdminDashboard';

const AddRole = () => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState(null); // Mock role, update as necessary
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const campuses = [{ label: 'Central Campus', value: 'Lavasa Campus' }, { label: 'Lav', value: 'campusB' }];
    const departments = [{ label: 'Department X', value: 'deptX' }, { label: 'Department Y', value: 'deptY' }];
    const users = [{ label: 'User 1', value: 'user1' }, { label: 'User 2', value: 'user2' }];
    const roles = [{ label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }];

    const handleSubmit = () => {
        // Handle the submit action, fetch current role for user
    };

    const handleSave = () => {
        // Save the role assignment
    };

    const handleAddRoleClick = () => {
        setShowAdditionalFields(true);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 bg-light p-3">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 p-7">
                    <h1 className="text-center fw-bold fs-5 mb-4">Role Settings</h1>

                    {/* First Row: Campus, Department, User */}
                    <div className="row mt-6">
                        <div className="col-md-4">
                            <label htmlFor="campus" className="form-label">Campus</label>
                            <div className="form-group">
                                <Dropdown id="campus" value={selectedCampus} options={campuses}
                                    onChange={(e) => setSelectedCampus(e.value)}
                                    placeholder="Select Campus"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="department" className="form-label">Department</label>
                            <div className="form-group">
                                <Dropdown id="department" value={selectedDepartment} options={departments}
                                    onChange={(e) => setSelectedDepartment(e.value)}
                                    placeholder="Select Department"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="user" className="form-label">User</label>
                            <div className="form-group">
                                <Dropdown id="user" value={selectedUser} options={users}
                                    onChange={(e) => setSelectedUser(e.value)}
                                    placeholder="Select User"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col mt-3">
                        <div className="col-md-12 text-start">
                            <button className="btn btn-primary posi" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>


                    {/* Display current role if it exists */}
                    {currentUserRole && (
                        <div className="mt-3">
                            <h5>Current Role: {currentUserRole}</h5>
                        </div>
                    )}

                    {/* Add Role Button */}
                    <div className="mt-3">
                        <button className="btn btn-success" onClick={handleAddRoleClick}>
                            <FontAwesomeIcon icon={faPlus} /> Add Role
                        </button>
                    </div>

                    {/* Second Row: Role, Campus, Department - Conditionally displayed */}
                    {showAdditionalFields && (
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <label htmlFor="role" className="form-label">Role</label>
                                <div className="form-group">
                                    <Dropdown id="role" value={selectedRole} options={roles}
                                        onChange={(e) => setSelectedRole(e.value)}
                                        placeholder="Select Role"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="campus2" className="form-label">Campus</label>
                                <div className="form-group">
                                    <Dropdown id="campus2" value={selectedCampus} options={campuses}
                                        onChange={(e) => setSelectedCampus(e.value)}
                                        placeholder="Select Campus"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="department2" className="form-label">Department</label>
                                <div className="form-group">
                                    <Dropdown id="department2" value={selectedDepartment} options={departments}
                                        onChange={(e) => setSelectedDepartment(e.value)}
                                        placeholder="Select Department"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    {showAdditionalFields && (
                        <div className="row mt-3">
                            <div className="col-md-12 text-start">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRole;
