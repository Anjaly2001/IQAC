import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListAcademicYear = () => {
    const [academicYears, setAcademicYears] = useState([
        { id: 1, campus: 'Campus A', start_date: '2023-08-01', end_date: '2024-07-31', label: '2023-2024' },
        { id: 2, campus: 'Campus B', start_date: '2022-08-01', end_date: '2023-07-31', label: '2022-2023' }
    ]);
    const history = useNavigate();

    const handleEdit = (year) => {
        // Navigate to CreateAcademicYear page with pre-filled details
        history.push({
            pathname: '/create-academic-year',
            state: { academicYear: year }
        });
    };

    const handleDelete = (id) => {
        setAcademicYears(academicYears.filter(year => year.id !== id));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-6 pt-6">
                    <div className="container mt-5 p-5">
                        <h3>Academic Years</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Campus</th>
                                    <th>Label</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicYears.map((year) => (
                                    <tr key={year.id}>
                                        <td>{year.campus}</td>
                                        <td>{year.label}</td>
                                        <td>{year.start_date}</td>
                                        <td>{year.end_date}</td>
                                        <td>
                                            <button onClick={() => handleEdit(year)} className="btn btn-link">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>

                                            <button onClick={() => handleDelete(year.id)} className="btn btn-link text-danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAcademicYear;
