import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        // Mock data, replace with real data fetching
        const mockUsers = [
            { id: 1, name: 'Thomas', empId: '20101', email: 'thomas@example.com', department: 'Data Science', campus: 'Christ University Pune', status: true },
            { id: 2, name: 'Shine', empId: '20306', email: 'shine@example.com', department: 'BBA', campus: 'Christ University Pune', status: false },
        ];
        setUsers(mockUsers);
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={rowData.status ? 'badge bg-success' : 'badge bg-secondary'}>
                {rowData.status ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button className="btn btn-primary me-2 btn-sm">
                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                </button>
                <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
                </button>
            </>
        );
    };

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search  " />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const header = renderHeader();

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
                            <div className="text-center fw-bold fs-5 mb-4">User List</div>
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No users found."
                                    className="user-data-table"
                                    globalFilter={globalFilterValue} // Apply global filter
                                    header={header} // Add custom header with search bar
                                >
                                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
                                    <Column field="empId" header="Emp ID" filter filterPlaceholder="Search by Emp ID" />
                                    <Column field="email" header="Email" filter filterPlaceholder="Search by email" />
                                    <Column field="department" header="Department" filter filterPlaceholder="Search by department" />
                                    <Column field="campus" header="Campus" filter filterPlaceholder="Search by campus" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterPlaceholder="Search by status" />
                                    <Column header="Actions" body={actionBodyTemplate} exportable={false} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUser;
