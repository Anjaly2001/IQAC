import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
// import { department_list } from '../../axios/api';  // user list

const ListUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        emp_id: { value: null, matchMode: 'contains' },
        email: { value: null, matchMode: 'contains' },
        campus: { value: null, matchMode: 'contains' },
        department: { value: null, matchMode: 'contains' }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const dummyUsers = [
            {
                id: 1,
                name: 'Jesty',
                emp_id: 'EMP001',
                email: 'jesty@example.com',
                campus: 'Main Campus',
                department: 'Data Science',
                status: true,
                description: '20111'
            },
            {
                id: 2,
                name: 'Jasmine',
                emp_id: 'EMP002',
                email: 'jasmine@example.com',
                campus: 'Pune Campus',
                department: 'Law',
                status: false,
                description: '24126'
            },
            {
                id: 3,
                name: 'Denny',
                emp_id: 'EMP003',
                email: 'denny@example.com',
                campus: 'Delhi Campus',
                department: 'BBA',
                status: true,
               description: '2452'
            },
            {
                id: 4,
                name: 'Anusha',
                emp_id: 'EMP004',
                email: 'anusha@example.com',
                campus: 'Kengeri Campus',
                department: 'MBA',
                status: false,
               description: '20112'
            },
            {
                id: 5,
                name: 'Albert',
                emp_id: 'EMP005',
                email: 'albert@example.com',
                campus: 'Pune Campus',
                department: 'Commerce',
                status: true,
                description: '20512'
            },
        ];

        setUsers(dummyUsers);
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
        <div className="d-flex justify-content-between align-items-center">
            <div className="fw-bold fs-5">User List</div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );
    
    const header = renderHeader();

    const customBodyTemplate = (rowData) => {
        return <div
            dangerouslySetInnerHTML={{ __html: rowData.description }}
        />;
    };

    return (
        <div>
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No User found."
                                    globalFilterFields={['name', 'emp_id', 'email', 'campus', 'department']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                    responsiveLayout="scroll"
                                >
                                    <Column field="name" header="User Name" filter filterPlaceholder="Search name" filterMatchMode="contains" />
                                    <Column field="emp_id" header="Emp ID" filter filterPlaceholder="Search ID" filterMatchMode="contains" body={customBodyTemplate} />
                                    <Column field="email" header="Email" filter filterPlaceholder="Search email" filterMatchMode="contains" />
                                    <Column field="campus" header="Campus" filter filterPlaceholder="Search campus" filterMatchMode="contains" />
                                    <Column field="department" header="Department" filter filterPlaceholder="Search Department" filterMatchMode="contains" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} />
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

export default ListUser;
