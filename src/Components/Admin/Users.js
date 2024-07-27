import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserService';
import DepartmentService from '../../Services/DepartmentServices';
import './Admin.css';

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
        <div className="users">
            <h2>Users</h2>
            <div className="user-actions">
                <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <select
                    value={userDepartment}
                    onChange={(e) => setUserDepartment(e.target.value)}
                >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.name}>{department.name}</option>
                    ))}
                </select>
                <button onClick={createUser}>Create User</button>
            </div>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        {editingUser && editingUser.id === user.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                                <select
                                    value={newUserDepartment}
                                    onChange={(e) => setNewUserDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.name}>{department.name}</option>
                                    ))}
                                </select>
                                <button onClick={editUser}>Save</button>
                                <button onClick={() => setEditingUser(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span>{user.name} ({user.department})</span>
                                <span className={user.status === 'active' ? 'status-active' : 'status-inactive'}>{user.status}</span>
                                <button onClick={() => startEditing(user)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
