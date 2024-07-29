import React, { useState, useEffect } from 'react';
import DepartmentService from '../../Services/DepartmentServices';
import Header from '../Common/Header';
import './Admin.css';
import AdminSidebar from './AdminSidebar';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [iqacHead, setIqacHead] = useState('');
    const [type, setType] = useState('');
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [newIqacHead, setNewIqacHead] = useState('');
    const [newType, setNewType] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await DepartmentService.getAllDepartments();
        setDepartments(response.data);
    };

    const createDepartment = async () => {
        if (departmentName && iqacHead && type) {
            await DepartmentService.createDepartment({ name: departmentName, iqacHead, type });
            setDepartmentName('');
            setIqacHead('');
            setType('');
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
        setNewIqacHead(department.iqacHead);
        setNewType(department.type);
    };

    const editDepartment = async () => {
        if (editingDepartment && newDepartmentName && newIqacHead && newType) {
            await DepartmentService.updateDepartment(editingDepartment.id, { name: newDepartmentName, iqacHead: newIqacHead, type: newType });
            setEditingDepartment(null);
            setNewDepartmentName('');
            setNewIqacHead('');
            setNewType('');
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
                    <div className="col-md-10  mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Departments
                            </div>

                            <div className="register">
                                <div className="department-actions mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Department Name"
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="IQAC Head"
                                        value={iqacHead}
                                        onChange={(e) => setIqacHead(e.target.value)}
                                    />
                                    <select
                                        className="form-select mt-2"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="">Choose Type</option>
                                        <option value="Department">Department</option>
                                        <option value="Club">Club</option>
                                        <option value="Center">Center</option>
                                    </select>
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={createDepartment}
                                    >
                                        Create Department
                                    </button>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Department Name</th>
                                            <th scope="col">IQAC Head</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departments.map((department) => (
                                            <tr key={department.id}>
                                                {editingDepartment && editingDepartment.id === department.id ? (
                                                    <>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={newDepartmentName}
                                                                onChange={(e) => setNewDepartmentName(e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={newIqacHead}
                                                                onChange={(e) => setNewIqacHead(e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                className="form-select"
                                                                value={newType}
                                                                onChange={(e) => setNewType(e.target.value)}
                                                            >
                                                                <option value="">Choose Type</option>
                                                                <option value="Department">Department</option>
                                                                <option value="Club">Club</option>
                                                                <option value="Center">Center</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={editDepartment}
                                                            >
                                                                Save
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{department.name}</td>
                                                        <td>{department.iqacHead}</td>
                                                        <td>{department.type}</td>
                                                        <td>
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
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departments;
