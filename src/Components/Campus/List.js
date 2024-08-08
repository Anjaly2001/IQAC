import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';

const ListCampus = () => {
    // Demo data
    const [campuses, setCampuses] = useState([
        { id: 1, name: 'Christ University Lavasa', logo: 'https://example.com/lavasa-logo.png' },
        { id: 2, name: 'Christ University Bangalore', logo: 'https://example.com/bangalore-logo.png' },
        { id: 3, name: 'Christ University Delhi', logo: 'https://example.com/delhi-logo.png' },
    ]);

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const updatedCampuses = campuses.map(campus =>
                campus.id === id
                    ? { ...campus, logo: URL.createObjectURL(file) }
                    : campus
            );
            setCampuses(updatedCampuses);
        }
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
                                List of Campuses
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Campus Name</th>
                                        <th scope="col"> Logo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campuses.length > 0 ? (
                                        campuses.map((campus) => (
                                            <tr key={campus.id}>
                                                <td>{campus.name}</td>
                                                <td>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        onChange={(e) => handleFileChange(e, campus.id)} 
                                                        className="form-control" 
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="text-center">
                                                No campuses available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCampus;
