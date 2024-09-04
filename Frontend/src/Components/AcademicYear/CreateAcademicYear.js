import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { campus_list, academic_register} from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAcademicYear = () => {
    const [campus, setCampus] = useState('');
    const [label, setLabel] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [campuses, setCampuses] = useState([]); // State for campuses
    const [error, setError] = useState(''); // State for form validation errors
    const history = useNavigate();

    useEffect(() => {
        const fetchCampuses= async () => {
            try {
                const response = await campus_list();
                if (response && Array.isArray(response)) {
                    setCampuses(response);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                toast.error('Failed to fetch locations.');
            }
        };
        fetchCampuses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!campus || !label || !startDate || !endDate) {
            setError('Please fill all fields');
            return;
        }

        const newAcademicYear = { campus, label, start_date: startDate, end_date: endDate };

        try {
            const response = await academic_register() // Update the URL with your backend endpoint
            console.log('Academic Year created:', response);

            // Reset the form
            setCampus('');
            setLabel('');
            setStartDate('');
            setEndDate('');
            setError('');

            // Navigate to ListAcademicYear page
            history('/list-academic-year');
        } catch (error) {
            console.error('Error creating academic year:', error);
            setError('Failed to create academic year.');
        }
    };
    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-1 pt-6">
                    <div className="container mt-5 p-6">
                        <div className="d-flex flex-column align-items-center mb-5 mt-5">
                            <h2>Create Academic Year</h2>
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="row mb-4">
                                <div className="col-md-6 mt-4">
                                    <label htmlFor="location">
                                        Campus: <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="location"
                                        className="form-select"
                                        value={campus}
                                        onChange={(e) => setCampus(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose Location</option>
                                        {campuses.length > 0 ? (
                                            campuses.map(loc => (
                                                <option key={loc.id} value={loc.id}>
                                                    {loc.campus}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No locations available</option>
                                        )}
                                        {/* <option value="Others">Others</option> */}
                                    </select>
                                    <small className="form-text text-muted">Select the campus for this academic year.</small>
                                </div>


                                    <div className="col-md-6 mt-4 mb-4">
                                        <label htmlFor="label">
                                            Label: <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="label"
                                            className="form-control"
                                            value={label}
                                            placeholder="e.g., 2023-2024"
                                            onChange={(e) => setLabel(e.target.value)}
                                            required
                                        />
                                        <small className="form-text text-muted">Enter a label for this academic year.</small>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6 mt-3">
                                        <label htmlFor="startDate">
                                            Start Date: <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                        <small className="form-text text-muted">Enter the start date for this academic year.</small>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label htmlFor="endDate">
                                            End Date: <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            className="form-control"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                        <small className="form-text text-muted">Enter the end date for this academic year.</small>
                                    </div>
                                </div>
                                {error && <div className="text-danger mb-3">{error}</div>}
                                <div className="d-flex justify-content-start">
                                    <button type="submit" className="btn btn-primary">
                                        Create Academic Year
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAcademicYear;
