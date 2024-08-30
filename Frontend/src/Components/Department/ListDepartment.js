import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch } from 'react-icons/fa'; // Removed FaEdit, FaTrash imports
import { Tag } from 'primereact/tag';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { department_list, department_active } from '../../axios/api'; // Removed department_delete import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DepartmentList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        location: { value: null, matchMode: 'contains' }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await department_list();
            const departmentsWithDefaultStatus = response.map(department => ({
                ...department,
                status: department.status !== undefined ? department.status : true
            }));
            setDepartments(departmentsWithDefaultStatus);
            console.log(response);
            setUsers(response);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const startEditing = (user) => {
        navigate(`/update-user/${user.id}`);
    };

    const toggleStatus = async (user) => {
        try {
            const updatedDepartment = await department_active(user.id);
            setUsers(users.map(u =>
                u.id === user.id ? { ...u, status: !u.status } : u
            ));
            if (user.status) {
                toast.success('Department activated successfully!');
            } else {
                toast.success('Department deactivated successfully!');
            }
        } catch (error) {
            console.error('Error toggling department status:', error);
        }
    };

    const actionBodyTemplate = (rowData) => (
        // Render only the edit icon for editing users
        <div>
            <i
                className="fas fa-edit text-warning me-3 cursor-pointer"
                onClick={() => startEditing(rowData)}
                title="Edit"
            ></i>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        // Render status tag (Active/Inactive) with click event to toggle status
        <Tag
            value={rowData.status ? 'inactive' : 'Active'}
            severity={rowData.status ? 'danger' : 'success'}
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
            <div className="fw-bold fs-5">Department List</div>
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
            <ToastContainer />
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-5 p-6">
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No department found."
                                    globalFilterFields={['name', 'description', 'type', 'location']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                    responsiveLayout="scroll"
                                >
                                    <Column field="name" header="Dept Name" filter filterPlaceholder="Search by department name" filterMatchMode="contains" />
                                    <Column field="location" header="Location" filter filterPlaceholder="Search by location" filterMatchMode="contains" />
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

export default DepartmentList;
