import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';

const UpdateDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        // Fetch the department details based on the id
        // This is a placeholder; you should replace it with actual data fetching logic
        const mockData = [
            { id: 1, name: 'Data Science', description: 'Computer Science Department', type: 'Department', location: 'Christ University Lavasa ' },
            { id: 2, name: 'Infotech', description: 'Computer Science Department', type: 'Department', location: 'Christ University Bangalore' },
            { id: 3, name: 'Bussiness', description: 'Commerce Department', type: 'Department', location: 'Christ University Delhi' }
        ];
        const dept = mockData.find(d => d.id === parseInt(id));
        setDepartment(dept);
    }, [id]);

    const handleSave = () => {
        // Implement save logic here
        console.log('Department updated:', department);
    };

    if (!department) return <div>Loading...</div>;

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="container mt-5">
                        <h2>Edit Department</h2>
                        <div className="form-group">
                            <label>Department Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={department.name}
                                onChange={(e) => setDepartment({ ...department, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={department.description}
                                onChange={(e) => setDepartment({ ...department, description: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                className="form-select"
                                value={department.type}
                                onChange={(e) => setDepartment({ ...department, type: e.target.value })}
                            >
                                <option value="Department">Department</option>
                                <option value="Club">Club</option>
                                <option value="Center">Center</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={department.location}
                                onChange={(e) => setDepartment({ ...department, location: e.target.value })}
                            />
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateDepartment;
