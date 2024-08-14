import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListUser = () => {
    const navigate = useNavigate();
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

    useEffect(() => {
        fetchUsers(); // Fetch users when the component is mounted
    }, []);

    const fetchUsers = async () => {
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
    };

    const startEditing = (user) => {
        // Navigate to the user update page with the selected user's ID
        navigate(`/update-user/${user.id}`);
    };

    const handleDeleteUser = (id) => {
        // Filter out the deleted user from the users list
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleStatus = (user) => {
        // Toggle the status (active/inactive) of the selected user
        setUsers(users.map(u =>
            u.id === user.id ? { ...u, status: !u.status } : u
        ));
    };

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
                onClick={() => handleDeleteUser(rowData.id)}
                title="Delete"
            />
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        // Render status tag (Active/Inactive) with click event to toggle status
        <Tag
            value={rowData.status ? 'Active' : 'Inactive'}
            severity={rowData.status ? 'success' : 'danger'}
            onClick={() => toggleStatus(rowData)}
        />
    );

    const onGlobalFilterChange = (e) => {
        // Update global filter value when the search input changes
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
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
        </div>
    );

    const header = renderHeader(); // Generate the header for the DataTable

    return (
        <div>
            <AdminDashboard /> {/* Render the AdminDashboard component */}
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
