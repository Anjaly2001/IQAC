import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RegisterMultipleUser = () => {
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchMockUsers();
    }, []);

    const fetchMockUsers = () => {
        const mockUsers = [
            { id: 1, name: 'Thomas', empId: '20101', mailId: 'thomas@example.com', department: 'HOD', status: true },
            { id: 2, name: 'Shine', empId: '20306', mailId: 'shine@example.com', department: 'Coordinator', status: false },
        ];
        setUsers(mockUsers);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const newUsers = parseCSV(text);
                setUsers([...users, ...newUsers]);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = (text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        return lines.slice(1).map((line, index) => {
            const values = line.split(',').map(value => value.trim());
            const user = headers.reduce((acc, header, i) => {
                acc[header] = values[i];
                return acc;
            }, {});
            return {
                id: users.length + index + 1,
                name: user.Name,
                empId: user.EmpID,
                mailId: user.MailID,
                department: user.Department,
                status: user.Status.toLowerCase() === 'active',
            };
        });
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={rowData.status ? 'badge bg-success' : 'badge bg-secondary'}>
                {rowData.status ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const header = (
        <div className="table-header">
            Registered Users
        </div>
    );

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
                                Register Multiple Users
                            </div>
                            <div className="register">
                                <div className="user-actions mb-4">
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={handleFileUpload}
                                    >
                                        Upload CSV File
                                    </button>
                                </div>
                                <div className="user-list">
                                    <DataTable value={users} paginator rows={10} dataKey="id" header={header} emptyMessage="No users found.">
                                        <Column field="empId" header="Emp ID" style={{ minWidth: '12rem' }} />
                                        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
                                        <Column field="mailId" header="Mail ID" style={{ minWidth: '12rem' }} />
                                        <Column field="department" header="Department" style={{ minWidth: '12rem' }} />
                                        <Column field="status" header="Status" style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                                        <Column 
                                            header="Actions" 
                                            body={(rowData) => (
                                                <div className="d-flex">
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(rowData.id)}>Delete</button>
                                                </div>
                                            )}
                                        />
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

export default RegisterMultipleUser;
