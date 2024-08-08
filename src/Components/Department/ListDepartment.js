import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AdminDashboard from '../Admin/AdminDashboard';

const ListDepartment = ({ onEditDepartment, onDeleteDepartment }) => {
    const navigate = useNavigate();

    // Mock data for demonstration
    const initialDepartments = [
        { id: 1, name: 'Data Science', description: 'Computer Science Department', type: 'Department', location: 'Christ University Lavasa ' },
        { id: 2, name: 'Infotech', description: 'Computer Science Department', type: 'Department', location: 'Christ University Bangalore' },
        { id: 3, name: 'Bussiness', description: 'Commerce Department', type: 'Department', location: 'Christ University Delhi' }
    ];

    const [departments, setDepartments] = useState(initialDepartments);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newType, setNewType] = useState('');
    const [newLocation, setNewLocation] = useState('');

    const startEditing = (department) => {
        setEditingDepartment(department);
        navigate(`/update-department/${department.id}`);
    };

    const editDepartment = () => {
        if (editingDepartment && newDepartmentName && newDescription && newType && newLocation) {
            const updatedDepartments = departments.map(department =>
                department.id === editingDepartment.id
                    ? { ...department, name: newDepartmentName, description: newDescription, type: newType, location: newLocation }
                    : department
            );
            setDepartments(updatedDepartments);
            setEditingDepartment(null);
            setNewDepartmentName('');
            setNewDescription('');
            setNewType('');
            setNewLocation('');
        }
    };

    const handleDeleteDepartment = (id) => {
        setDepartments(departments.filter(department => department.id !== id));
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button
                    className="btn btn-warning me-2"
                    onClick={() => startEditing(rowData)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteDepartment(rowData.id)}
                >
                    Delete
                </button>
            </>
        );
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                List of Departments
                            </div>
                            <div className="table-responsive">
                                <DataTable value={departments} paginator rows={10} dataKey="id" emptyMessage="No departments found.">
                                    <Column field="name" header="Department Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                                    <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ minWidth: '12rem' }} />
                                    <Column field="type" header="Type" filter filterPlaceholder="Search by type" style={{ minWidth: '12rem' }} />
                                    <Column field="location" header="Location" filter filterPlaceholder="Search by location" style={{ minWidth: '12rem' }} />
                                    <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '10rem' }} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListDepartment;
