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
import { users_list, user_active, user_delete} from '../../axios/api';  // user list
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await users_list(); // Call your API function, pass token if needed
                setUsers(response);  // Adjust based on response structure
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        
        fetchUsers(); // Fetch users when the component mounts
    }, []);

 


    const startEditing = (user) => {
        navigate(`/update-user/${user.id}`);
    };

    
    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await user_delete(id);
            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted successfully!');
            // setDepartments(response)
        } catch (error) {
            console.error('Error deleting User:', error);
            console.log(error)
            // toast.success('Department deleted successfully!');
        }
    };

    const toggleStatus = async (user) => {
        try {
            const updatedDepartment = await user_active(user.id);
            setUsers(users.map(u =>
                u.id === user.id ? { ...u, status: !u.status } : u
            ));
            if (user.status) {
                toast.success('User deactivated successfully!');
            } else {
                toast.success('User activated successfully!');
            }
        } catch (error) {
            console.error('Error toggling User status:', error);
        }
    };


    // const toggleStatus = (user) => {
    //     setUsers(users.map(u =>
    //         u.id === user.id ? { ...u, status: !u.status } : u
    //     ));
    // };

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
            <ToastContainer />
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
                                    globalFilterFields={['username', 'emp_id', 'email', 'campus', 'department']}
                                    filters={filters}
                                    filterDisplay="row"
                                    header={header}
                                    responsiveLayout="scroll"
                                >
                                    <Column field="username" header="User Name" filter filterPlaceholder="Search name" filterMatchMode="contains" />
                                    <Column field="emp_id" header="Emp ID" filter filterPlaceholder="Search ID" filterMatchMode="contains"  />
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
// body={customBodyTemplate}