import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { department_list} from '../../axios/api';  // user list

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
        const token = localStorage.getItem('access_token');
        try {
            // const token = localStorage.getItem('access_token');
            const response = await department_list()      //  make it as user_list
            console.log(response)
            setUsers(response);
        } catch (error) {
            console.error('Error fetching User:', error);
        }
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
        console.log("hello");
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="flex justify-content-end">
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
                            <div className="text-center fw-bold fs-5 mb-4">User List</div>
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No User found."
                                    globalFilterFields={['name', 'emp id', 'email', 'campus','department']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                    responsiveLayout="scroll"
                                >
                                    <Column field="name" header="User Name" filter filterPlaceholder="Search by User name" filterMatchMode="contains" />
                                    <Column field="emp_id" filters={filters} header="Emp ID" filter filterPlaceholder="Search by description" filterMatchMode="contains" body={customBodyTemplate} />
                                    <Column field="email" header="Email" filter filterPlaceholder="Search by email" filterMatchMode="contains" />
                                    <Column field="campus" header="Campus" filter filterPlaceholder="Search by campus" filterMatchMode="contains" />
                                    <Column field="department" header="Departmemt" filter filterPlaceholder="Search by Department" filterMatchMode="contains" />
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
