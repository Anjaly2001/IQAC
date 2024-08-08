import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RegisterSingleUser = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userStatus, setUserStatus] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmpId, setNewUserEmpId] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserDepartment, setNewUserDepartment] = useState('');
    const [newUserStatus, setNewUserStatus] = useState(true);

    useEffect(() => {
        fetchUsers();
        fetchDepartments();
    }, []);

    const fetchUsers = async () => {
        const mockUsers = [
            { id: 1, name: 'Thomas', empId: '20101', email: 'thomas@example.com', department: 'HOD', status: true },
            { id: 2, name: 'Shine', empId: '20306', email: 'shine@example.com', department: 'Coordinator', status: false },
        ];
        setUsers(mockUsers);
    };

    const fetchDepartments = async () => {
        const mockDepartments = [
            { id: 1, name: 'HOD' },
            { id: 2, name: 'Coordinator' },
            { id: 3, name: 'Faculty' },
        ];
        setDepartments(mockDepartments);
    };

    const createUser = () => {
        if (userName && userEmpId && userEmail && userDepartment) {
            const newUser = {
                id: users.length + 1,
                name: userName,
                empId: userEmpId,
                email: userEmail,
                department: userDepartment,
                status: userStatus,
            };
            setUsers([...users, newUser]);
            setUserName('');
            setUserEmpId('');
            setUserEmail('');
            setUserDepartment('');
            setUserStatus(true);
        }
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const startEditing = (user) => {
        setEditingUser(user);
        setNewUserName(user.name);
        setNewUserEmpId(user.empId);
        setNewUserEmail(user.email);
        setNewUserDepartment(user.department);
        setNewUserStatus(user.status);
    };

    const editUser = () => {
        if (editingUser && newUserName && newUserEmpId && newUserEmail && newUserDepartment) {
            const updatedUsers = users.map(user =>
                user.id === editingUser.id
                    ? { ...user, name: newUserName, empId: newUserEmpId, email: newUserEmail, department: newUserDepartment, status: newUserStatus }
                    : user
            );
            setUsers(updatedUsers);
            setEditingUser(null);
            setNewUserName('');
            setNewUserEmpId('');
            setNewUserEmail('');
            setNewUserDepartment('');
            setNewUserStatus(true);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button className="btn btn-primary me-2" onClick={() => startEditing(rowData)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(rowData.id)}>Delete</button>
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={rowData.status ? 'badge bg-success' : 'badge bg-secondary'}>
                {rowData.status ? 'Active' : 'Inactive'}
            </span>
        );
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
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Single User
                            </div>
                            <div className="register">
                                <div className="user-actions mb-4">
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Emp ID"
                                                value={userEmpId}
                                                onChange={(e) => setUserEmpId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <select
                                                className="form-select"
                                                value={userDepartment}
                                                onChange={(e) => setUserDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                {departments.map((department) => (
                                                    <option key={department.id} value={department.name}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-check mt-2">
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
                                        className="btn btn-primary mt-2"
                                        onClick={createUser}
                                    >
                                        Create User
                                    </button>
                                </div>
                                <div className="user-list">
                                    <DataTable value={users} paginator rows={10} dataKey="id" emptyMessage="No users found.">
                                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                                        <Column field="empId" header="Emp ID" filter filterPlaceholder="Search by Emp ID" style={{ minWidth: '10rem' }} />
                                        <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '15rem' }} />
                                        <Column field="department" header="Department" filter filterPlaceholder="Search by department" style={{ minWidth: '10rem' }} />
                                        <Column field="status" header="Status" body={statusBodyTemplate} filter filterPlaceholder="Search by status" style={{ minWidth: '8rem' }} />
                                        <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '10rem' }} />
                                    </DataTable>
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
