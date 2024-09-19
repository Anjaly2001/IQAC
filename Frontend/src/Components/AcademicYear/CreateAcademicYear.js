import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { campus_list, academic_register, update_academic_year } from '../../axios/api';
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
    const [dateError, setDateError] = useState('');
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
            setCampus(academicYear.location.id);
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

    const validateDates = () => {
        if (startDate && endDate && label) {
            const [startYear, endYear] = label.split('-').map(Number);
            const [startDateYear] = startDate.split('-').map(Number);
            const [endDateYear] = endDate.split('-').map(Number);

            if (startDateYear !== startYear || endDateYear !== endYear) {
                setDateError(`The start date should be within ${startYear} and the end date should be within ${endYear}.`);
                return false;
            }

            if (new Date(startDate) > new Date(endDate)) {
                setDateError('End date must be after start date.');
                return false;
            }

            setDateError('');
            return true;
        }
        return false;
    };

    const handleLabelChange = (e) => {
        const newLabel = e.target.value;
        setLabel(newLabel);
        validateYear(newLabel); // Validate year on label change
        validateDates(); // Validate dates on label change
    };

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        validateDates(); // Validate dates on start date change
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        validateDates(); // Validate dates on end date change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!location_id || !label || !startDate || !endDate) {
            setError('Please fill all fields');
            return;
        }

        if (!validateDates()) {
            return;
        }

        const newAcademicYear = {
            location_id: location_id,
            label,
            start_date: startDate,
            end_date: endDate
        };

        try {
            let response;
            if (isEdit && academicYearId) {
                response = await update_academic_year(academicYearId, newAcademicYear);
            } else {
                response = await academic_register(newAcademicYear);
            }
            console.log('Academic Year processed:', response);

            setCampus('');
            setLabel('');
            setStartDate('');
            setEndDate('');
            setError('');

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
                                            onChange={handleLabelChange}
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
                                            onChange={handleStartDateChange}
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
                                            onChange={handleEndDateChange}
                                            required
                                        />
                                        <small className="form-text text-muted">Enter the end date for this academic year.</small>
                                    </div>
                                </div>
                                {dateError && <div className="text-danger mb-3">{dateError}</div>}
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
            <ToastContainer />
        </div>
    );
};

export default CreateAcademicYear;
