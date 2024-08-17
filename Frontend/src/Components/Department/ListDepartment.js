import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const DepartmentList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        Dept_name: { value: null, matchMode: 'contains' },
        Description: { value: null, matchMode: 'contains' },
        Type: { value: null, matchMode: 'contains' },
        Location: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'equals' }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const mockUsers = [
            { id: 1, Dept_name: 'Data Science', Description: 'Department', Type: 'Department', Location: 'Christ University Banglore Central Campus', status: true },
            { id: 2, Dept_name: 'Swo', Description: 'Student Welfare Office', Type: 'Center', Location: 'Christ University Lavasa Campus', status: false },
        ];
        setUsers(mockUsers);
    };

    const startEditing = (user) => {
        navigate(`/update-user/${user.id}`);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleStatus = (user) => {
        setUsers(users.map(u =>
            u.id === user.id ? { ...u, status: !u.status } : u
        ));
    };

    const actionBodyTemplate = (rowData) => (
        <div>
            <FaEdit
                className="text-warning me-3 cursor-pointer"
                onClick={() => startEditing(rowData)}
                title="Edit"
            />
            <FaTrash
                className="text-danger cursor-pointer"
                onClick={() => handleDeleteUser(rowData.id)}
                title="Delete"
            />
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag
            value={rowData.status ? 'Active' : 'Inactive'}
            severity={rowData.status ? 'success' : 'danger'}
            onClick={() => toggleStatus(rowData)}
        />
    );

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="d-flex justify-content-end">
            <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FaSearch />
                </span>
                <InputText
                    type="search"
                    placeholder="Search users"
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    className="form-control border-start-0"
                />
            </div>
        </div>
    );

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
                            <div className="text-center fw-bold fs-5 mb-4">Department List</div>
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No users found."
                                    globalFilterFields={['Dept_name', 'Description', 'Type', 'Location']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                >
                                    <Column field="Dept_name" header="Dept Name" filter filterPlaceholder="Search by department name" filterMatchMode="contains" />
                                    <Column field="Description" header="Description" filter filterPlaceholder="Search by description" filterMatchMode="contains" />
                                    <Column field="Type" header="Type" filter filterPlaceholder="Search by type" filterMatchMode="contains" />
                                    <Column field="Location" header="Location" filter filterPlaceholder="Search by location" filterMatchMode="contains" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={(options) => (
                                        <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
                                    )} />
                                    <Column header="Actions" body={actionBodyTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentList;
