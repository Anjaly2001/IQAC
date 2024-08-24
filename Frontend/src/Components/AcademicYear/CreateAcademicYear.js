import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';

const AcademicYear = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [label, setLabel] = useState(''); // Add a state for the label

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic for submitting the data will be handled here
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Label:', label);

        // Uncomment and update the following logic when the backend is ready
        /*
        fetch('/api/create-academic-year/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ start_date: startDate, end_date: endDate, label }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        */
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-6 pt-6">
                    <div className="container mt-5">
                        <div className="d-flex flex-column align-items-center mb-5 mt-5">
                            <h2>Create Academic Year</h2>
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="row mb-4">
                                    <div className="col-md-4 mt-3">
                                        <label htmlFor="startDate">Start Date:</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <label htmlFor="endDate">End Date:</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            className="form-control"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <label htmlFor="label">Label:</label>
                                        <input
                                            type="text"
                                            id="label"
                                            className="form-control"
                                            value={label}
                                            onChange={(e) => setLabel(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
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

export default AcademicYear;
