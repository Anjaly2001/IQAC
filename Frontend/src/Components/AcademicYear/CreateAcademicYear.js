import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { campus_list, academic_register, update_academic_year } from '../../axios/api'; // Import update function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Sidebar';

const CreateAcademicYear = () => {
    const [location_id, setCampus] = useState('');
    const [label, setLabel] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [campuses, setCampuses] = useState([]);
    const [error, setError] = useState('');
    const [yearError, setYearError] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [academicYearId, setAcademicYearId] = useState(null);

    const history = useNavigate();
    const locationState = useLocation().state;

    useEffect(() => {
        const fetchCampuses = async () => {
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

    useEffect(() => {
        if (locationState && locationState.academicYear) {
            const { academicYear } = locationState;
            setCampus(academicYear.location.id); // Populate state with current data
            setLabel(academicYear.label);
            setStartDate(academicYear.start_date);
            setEndDate(academicYear.end_date);
            setAcademicYearId(academicYear.id);
            setIsEdit(true);
        }
    }, [locationState]);

    const validateYear = (value) => {
        const yearRegex = /^\d{4}-\d{4}$/;
        
        if (!yearRegex.test(value)) {
            setYearError("Year format should be 'YYYY-YYYY'.");
            return;
        }
    
        const [startYear, endYear] = value.split('-').map(Number);
    
        if (endYear !== startYear + 1) {
            setYearError("The end year should be exactly 1 year more than the start year.");
        } else {
            setYearError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!location_id || !label || !startDate || !endDate) {
            setError('Please fill all fields');
            return;
        }

        const newAcademicYear = {
            location_id: location_id, // Sending location_id as an array
            label,
            start_date: startDate,
            end_date: endDate
        };

        try {
            let response;
            if (isEdit && academicYearId) {
                console.log('Updating academic year with ID:', academicYearId);
                console.log('Payload:', newAcademicYear);
                response = await update_academic_year(academicYearId, newAcademicYear); // Update API call
            } else {
                response = await academic_register(newAcademicYear); // Create API call
            }
            console.log('Academic Year processed:', response);

            // Reset the form
            setCampus('');
            setLabel('');
            setStartDate('');
            setEndDate('');
            setError('');

            // Navigate to ListAcademicYear page
            history('/listacademicyear');
        } catch (error) {
            console.error('Error processing academic year:', error);
            setError('Failed to create/update academic year.');
            toast.error('Failed to create/update academic year.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-1 pt-6">
                    <div className="container mt-5 p-6">
                        <div className="d-flex flex-column align-items-center mb-5 mt-5">
                            <h2>{isEdit ? 'Edit Academic Year' : 'Create Academic Year'}</h2>
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="row mb-4">
                                    <div className="col-md-6 mt-4">
                                        <label htmlFor="location">
                                            Campus: <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            id="location"
                                            className="form-select"
                                            value={location_id}
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
                                            onChange={(e) => {
                                                setLabel(e.target.value);
                                                validateYear(e.target.value); // Call the year validation function
                                            }}
                                            required
                                        />
                                        {yearError && <small className="text-danger">{yearError}</small>}
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
                                        {isEdit ? 'Update Academic Year' : 'Create Academic Year'}
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
