import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router
import { Dropdown } from 'primereact/dropdown';

const CreateAcademicYear = () => {
    const [campus, setCampus] = useState('');
    const [label, setLabel] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [campuses, setCampuses] = useState([]); // State for campuses
    const [error, setError] = useState(''); // State for form validation errors
    const history = useNavigate();

    useEffect(() => {
        // Fetch campuses from backend (dummy data for now)
        setCampuses([
            { id: 1, name: 'Campus A' },
            { id: 2, name: 'Campus B' }
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!campus || !label || !startDate || !endDate) {
            setError('Please fill all fields');
            return;
        }

        const newAcademicYear = { campus, label, start_date: startDate, end_date: endDate };

        // Post the new academic year to the backend (skipping for now)
        console.log(newAcademicYear);

        // Reset the form
        setCampus('');
        setLabel('');
        setStartDate('');
        setEndDate('');
        setError('');

        // Navigate to ListAcademicYear page
        history.push('/list-academic-year');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-6 pt-6">
                    <div className="container mt-5 p-4">
                        <div className="d-flex flex-column align-items-center mb-5 mt-5">
                            <h2>Create Academic Year</h2>
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="row mb-4">
                                    <div className="col-md-6 mt-3">
                                        <label htmlFor="campus">
                                            Campus: <span className="text-danger">*</span>
                                        </label>
                                        <Dropdown
                                            id="campus"
                                            value={campus}
                                            options={campuses.map(c => ({ label: c.name, value: c.name }))}
                                            onChange={(e) => setCampus(e.value)}
                                            placeholder="Select Campus"
                                            className="w-100"
                                            required
                                        />
                                        <small className="form-text text-muted">Select the campus for this academic year.</small>
                                    </div>

                                    <div className="col-md-6 mt-3">
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
