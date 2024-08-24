import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { department_list, department_delete, department_active } from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DepartmentList = () => {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [users, setUsers] = useState([]); // State to store the list of users
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        dept_name: { value: null, matchMode: 'startsWith' },
        description: { value: null, matchMode: 'contains' },
        type: { value: null, matchMode: 'startsWith' },
        location: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'equals' }
    }); // State for managing filters applied to the DataTable
    const [globalFilterValue, setGlobalFilterValue] = useState(''); // State for global search input
=======
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    // const [status,setStatus] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        // description: { value: null, matchMode: 'contains' },
        // type: { value: null, matchMode: 'contains' },
        location: { value: null, matchMode: 'contains' }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf

    useEffect(() => {
        fetchUsers(); // Fetch users when the component is mounted
    }, []);

    const fetchUsers = async () => {
<<<<<<< HEAD
        // Mock data to simulate fetching from an API or database
        const mockUsers = [
            { id: 1, dept_name: 'MSC Data Science', description: 'Advanced Data Science program', type: 'Department', location: 'Christ University Bangalore Kengeri Campus', status: true },
            { id: 2, dept_name: 'SWO', description: 'Student Welfare Office', type: 'Center', location: 'Christ University Delhi NCR Campus', status: false },
            { id: 3, dept_name: 'LLM (Constitutional Law)', description: 'LLM in Constitutional & Administrative Law', type: 'Department', location: 'Christ University Bangalore Bannerghatta Road Campus', status: true },
            { id: 4, dept_name: 'Infotech', description: 'Consultancy', type: 'Centre', location: ' Christ University Pune, Lavasa Campus', status: true },
            { id: 5, dept_name: 'BCom (Financial Analytics)', description: 'Financial Analytics specialization', type: 'Department', location: 'Christ University Bangalore Yeshwanthpur Campus', status: false },
            { id: 6, dept_name: 'Lavasa Trekkers', description: 'Trekking club', type: 'Club', location: 'Christ University Bangalore Central Campus', status: true },
        ];
        setUsers(mockUsers); // Set the fetched data to the state
=======
        const token = localStorage.getItem('access_token');
        try {
            // const token = localStorage.getItem('access_token');
            const response = await department_list()
            const departmentsWithDefaultStatus = response.map(department => ({
                ...department,
                status: department.status !== undefined ? department.status : true // Default to true (active)
            }));
            setDepartments(departmentsWithDefaultStatus);
            console.log(response)
            setUsers(response);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
    };
    const startEditing = (user) => {
        // Navigate to the user update page with the selected user's ID
        navigate(`/update-user/${user.id}`);
    };

<<<<<<< HEAD
    const handleDeleteUser = (id) => {
        // Filter out the deleted user from the users list
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleStatus = (user) => {
        // Toggle the status (active/inactive) of the selected user
        setUsers(users.map(u =>
            u.id === user.id ? { ...u, status: !u.status } : u
        ));
=======


    const handleDeleteDepartment = async (id) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await department_delete(id);
            setDepartments(departments.filter(department => department.id !== id));
            toast.success('Department deleted successfully!');
            // setDepartments(response)
        } catch (error) {
            console.error('Error deleting department:', error);
            console.log(error)
            // toast.success('Department deleted successfully!');
        }
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
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
    };

    // const toggleStatus = (user) => {
    //     setUsers(users.map(u =>
    //         u.id === user.id ? { ...u, status: !u.status } : u
    //     ));
    // };

    const actionBodyTemplate = (rowData) => (
        // Render action buttons for editing and deleting users
        <div>
            <FaEdit
                className="text-warning me-3 cursor-pointer"
                onClick={() => startEditing(rowData)}
                title="Edit"
            />
            <FaTrash
                className="text-danger cursor-pointer"
                onClick={() => handleDeleteDepartment(rowData.id)}
                title="Delete"
            />
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
<<<<<<< HEAD
        // Update global filter value when the search input changes
=======
        console.log("hello");
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
<<<<<<< HEAD
        // Render the header with a global search bar
        <div className="d-flex justify-content-end">
            <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FaSearch />
                </span>
                <InputText
                    type="search"
                    placeholder="Search departments"
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    className="form-control border-start-0"
                />
            </div>
=======
        <div className="d-flex justify-content-between align-items-center">
            <div className="fw-bold fs-5">Department List</div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
        </div>
    );

    const header = renderHeader(); // Generate the header for the DataTable

    const customBodyTemplate = (rowData) => {
        return <div
            dangerouslySetInnerHTML={{ __html: rowData.description }}
        />;
    };

    return (
        <div>
<<<<<<< HEAD
            <AdminDashboard /> {/* Render the AdminDashboard component */}
=======
            <ToastContainer />
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-3">
<<<<<<< HEAD
                            <div className="text-center fw-bold fs-5 mb-4">Department List</div>
                            <div className="table-container">
                                <DataTable
                                    value={users} // Data source for the DataTable
                                    paginator // Enable pagination
                                    rows={10} // Number of rows per page
                                    dataKey="id" // Unique identifier for rows
                                    emptyMessage="No departments found." // Message displayed when no data is found
                                    globalFilterFields={['dept_name', 'description', 'type', 'location']} // Fields used in global search
                                    filters={filters} // Apply filters to the DataTable
                                    filterDisplay="row" // Display filters in each row
                                    header={header} // Set the header with the global search
                                >
                                    <Column field="dept_name" header="Department Name" filter filterPlaceholder="Search by name" filterMatchMode="contains" />
                                    <Column field="description" header="Description" filter filterPlaceholder="Search by description" filterMatchMode="contains" />
                                    <Column field="type" header="Type" filter filterPlaceholder="Search by type" filterMatchMode="contains" />
                                    <Column field="location" header="Location" filter filterPlaceholder="Search by location" filterMatchMode="contains" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={(options) => (
                                        <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
                                    )} />
                                    <Column header="Actions" body={actionBodyTemplate} /> {/* Column for edit and delete actions */}
=======

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
                                    {/* <Column field="description" filters={filters} header="Description" filter filterPlaceholder="Search by description" filterMatchMode="contains" body={customBodyTemplate} />
                                    <Column field="type" header="Type" filter filterPlaceholder="Search by type" filterMatchMode="contains" /> */}
                                    <Column field="location" header="Location" filter filterPlaceholder="Search by location" filterMatchMode="contains" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} />
                                    <Column header="Actions" body={actionBodyTemplate} />
>>>>>>> cddc8bfd618ffe4e1ee50390b6e8a376c75082cf
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
