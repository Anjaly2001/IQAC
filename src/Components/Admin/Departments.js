import React, { useState, useEffect } from 'react';
import DepartmentService from '../../Services/DepartmentServices';
import Header from '../Common/Header';
import './Admin.css';
import AdminSidebar from './AdminSidebar';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await DepartmentService.getAllDepartments();
        setDepartments(response.data);
    };

    const createDepartment = async () => {
        if (departmentName) {
            await DepartmentService.createDepartment({ name: departmentName });
            setDepartmentName('');
            fetchDepartments();
        }
    };

    const deleteDepartment = async (id) => {
        await DepartmentService.deleteDepartment(id);
        fetchDepartments();
    };

    const startEditing = (department) => {
        setEditingDepartment(department);
        setNewDepartmentName(department.name);
    };

    const editDepartment = async () => {
        if (editingDepartment && newDepartmentName) {
            await DepartmentService.updateDepartment(editingDepartment.id, { name: newDepartmentName });
            setEditingDepartment(null);
            setNewDepartmentName('');
            fetchDepartments();
        }
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Departments
                            </div>

                            <div className="register">
                                <div className="department-actions mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="New Department Name"
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={createDepartment}
                                    >
                                        Create Department
                                    </button>
                                </div>

                                <div className="department-list">
                                    {departments.map((department) => (
                                        <div
                                            key={department.id}
                                            className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                            {editingDepartment && editingDepartment.id === department.id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={newDepartmentName}
                                                        onChange={(e) => setNewDepartmentName(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-success ms-2"
                                                        onClick={editDepartment}
                                                    >
                                                        Save
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{department.name}</span>
                                                    <div>
                                                        <button
                                                            className="btn btn-warning me-2"
                                                            onClick={() => startEditing(department)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => deleteDepartment(department.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departments;
