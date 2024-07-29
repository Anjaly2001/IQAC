import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserService';
import DepartmentService from '../../Services/DepartmentServices';
import './Admin.css';
import AdminSidebar from './AdminSidebar';
import Header from '../Common/Header';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [userName, setUserName] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newUserDepartment, setNewUserDepartment] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchDepartments();
    }, []);

    const fetchUsers = async () => {
        const response = await UserService.getAllUsers();
        setUsers(response.data);
    };

    const fetchDepartments = async () => {
        const response = await DepartmentService.getAllDepartments();
        setDepartments(response.data);
    };

    const createUser = async () => {
        if (userName && userDepartment) {
            await UserService.createUser({ name: userName, department: userDepartment, status: 'active' });
            setUserName('');
            setUserDepartment('');
            fetchUsers();
        }
    };

    const deleteUser = async (id) => {
        await UserService.deleteUser(id);
        fetchUsers();
    };

    const startEditing = (user) => {
        setEditingUser(user);
        setNewUserName(user.name);
        setNewUserDepartment(user.department);
    };

    const editUser = async () => {
        if (editingUser && newUserName && newUserDepartment) {
            await UserService.updateUser(editingUser.id, { name: newUserName, department: newUserDepartment, status: 'inactive' });
            setEditingUser(null);
            setNewUserName('');
            setNewUserDepartment('');
            fetchUsers();
        }
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Department for User
                            </div>

                            <div className="register">
                                <div className="user-actions mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="User Name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <select
                                        className="form-select mt-2"
                                        value={userDepartment}
                                        onChange={(e) => setUserDepartment(e.target.value)}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.name}>{department.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={createUser}
                                    >
                                        Create User
                                    </button>
                                </div>

                                <div className="user-list">
                                    {users.map(user => (
                                        <div key={user.id} className="user-item d-flex justify-content-between align-items-center mb-2">
                                            {editingUser && editingUser.id === user.id ? (
                                                <div className="d-flex flex-column w-100">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={newUserName}
                                                        onChange={(e) => setNewUserName(e.target.value)}
                                                    />
                                                    <select
                                                        className="form-select mt-2"
                                                        value={newUserDepartment}
                                                        onChange={(e) => setNewUserDepartment(e.target.value)}
                                                    >
                                                        <option value="">Select Department</option>
                                                        {departments.map(department => (
                                                            <option key={department.id} value={department.name}>{department.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="d-flex mt-2">
                                                        <button className="btn btn-success me-2" onClick={editUser}>Save</button>
                                                        <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-between w-100">
                                                    <span>{user.name} ({user.department})</span>
                                                    <span className={user.status === 'active' ? 'badge bg-success' : 'badge bg-secondary'}>
                                                        {user.status}
                                                    </span>
                                                    <div className="d-flex">
                                                        <button className="btn btn-warning me-2" onClick={() => startEditing(user)}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
