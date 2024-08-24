import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
<<<<<<< HEAD
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
=======
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
// import { department_list } from '../../axios/api';  // user list
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf

const ListUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
<<<<<<< HEAD
        name: { value: null, matchMode: 'startsWith' },
        empId: { value: null, matchMode: 'startsWith' },
        email: { value: null, matchMode: 'startsWith' },
        department: { value: null, matchMode: 'contains' },
        campus: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'equals' }
=======
        name: { value: null, matchMode: 'contains' },
        emp_id: { value: null, matchMode: 'contains' },
        email: { value: null, matchMode: 'contains' },
        campus: { value: null, matchMode: 'contains' },
        department: { value: null, matchMode: 'contains' }
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
<<<<<<< HEAD
        const mockUsers = [
            { id: 1, name: 'Thomas', empId: '20101', email: 'thomas.christUniversity.in', department: 'MSC Data Science', campus: 'Christ University Pune , Lavasa Campus', status: true },
            { id: 2, name: 'Shine', empId: '20306', email: 'shine.christUniversity.in', department: 'BBA (Business Analytics/Honours/Honours with Research)', campus: 'Christ University Delhi NCR Campus', status: false },
            { id: 3, name: 'Suraj', empId: '20202', email: 'suraj.christUniversity.in', department: 'LLM (Constitutional & Administrative Law)', campus: 'Christ University Bangalore Bannerghatta Road Campus', status: true },
            { id: 4, name: 'Anjaly', empId: '20303', email: 'anjaly.christUniversity.in', department: 'MA (English with Digital Humanities)', campus: 'Christ University Bangalore Kengeri Campus', status: true },
            { id: 5, name: 'Kripa', empId: '20405', email: 'kripa.christUniversity.in', department: 'LLM (Constitutional & Administrative Law)', campus: 'Christ University Bangalore Yeshwanthpur Campus', status: false },
            { id: 6, name: 'Gokul', empId: '20225', email: 'gokul.christUniversity.in', department: 'BCom (Financial Analytics/Honours/Honours with Research)', campus: 'Christ University Bangalore Central Campus', status: true },
=======
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
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
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
<<<<<<< HEAD
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

=======
        <div className="d-flex justify-content-between align-items-center">
            <div className="fw-bold fs-5">User List</div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );
    
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
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
<<<<<<< HEAD
                                    emptyMessage="No users found."
                                    globalFilterFields={['name', 'empId', 'email', 'department', 'campus']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                >
                                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" filterMatchMode="contains" />
                                    <Column field="empId" header="Emp ID" filter filterPlaceholder="Search by Emp ID" filterMatchMode="contains" />
                                    <Column field="email" header="Email" filter filterPlaceholder="Search by email" filterMatchMode="contains" />
                                    <Column field="department" header="Department" filter filterPlaceholder="Search by department" filterMatchMode="contains" />
                                    <Column field="campus" header="Campus" filter filterPlaceholder="Search by campus" filterMatchMode="contains" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={(options) => (
                                        <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
                                    )} />
=======
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
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
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
