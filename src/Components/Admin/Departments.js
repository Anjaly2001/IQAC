import React, { useState, useEffect } from 'react';
import DepartmentService from '../../Services/DepartmentServices';
import './Admin.css';

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
        <div className="departments">
            <h2>Departments</h2>
            <div className="department-actions">
                <input
                    type="text"
                    placeholder="New Department Name"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                />
                <button onClick={createDepartment}>Create Department</button>
            </div>
            <div className="department-list">
                {departments.map(department => (
                    <div key={department.id} className="department-item">
                        {editingDepartment && editingDepartment.id === department.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newDepartmentName}
                                    onChange={(e) => setNewDepartmentName(e.target.value)}
                                />
                                <button onClick={editDepartment}>Save</button>
                                <button onClick={() => setEditingDepartment(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span>{department.name}</span>
                                <button onClick={() => startEditing(department)}>Edit</button>
                                <button onClick={() => deleteDepartment(department.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Departments;
