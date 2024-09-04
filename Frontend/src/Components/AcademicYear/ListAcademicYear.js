import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { academic_list, academic_delete} from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListAcademicYear = () => {
    const [academicYears, setAcademicYears] = useState([]);
    const [error, setError] = useState(null);
    const history = useNavigate();

    // Fetch academic years from the backend API
    useEffect(() => {
        const fetchAcademicYears = async () => {
            try {
                const response = await academic_list() ; // Update with your API endpoint
                setAcademicYears(response.data);
            } catch (error) {
                console.error('Error fetching academic years:', error);
                setError('Failed to load academic years');
            }
        };

        fetchAcademicYears();
    }, []);

    const handleEdit = (year) => {
        // Navigate to CreateAcademicYear page with pre-filled details
        history('/create-academic-year', { state: { academicYear: year } });
    };

    const handleDelete = async (id) => {
        try {
            const response = await academic_delete(id); 
            setAcademicYears(academicYears.filter(year => year.id !== id));
            console.log(response);
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting academic year:', error);
            console.log(error)
            setError('Failed to delete academic year');
        }
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-6">
                    <div className="container mt-4 p-6 text-center text-bold">
                        <h3>Academic Years</h3>
                        <table className="table table-striped mt-5">
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
                                        <td>{year.location ? year.location.campus : 'No Campus Info'}</td> {/* Accessing nested campus */}
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
