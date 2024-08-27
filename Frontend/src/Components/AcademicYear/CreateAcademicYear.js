import React, { useState, useEffect } from 'react'; // Import useEffect along with useState
import AdminDashboard from '../Admin/AdminDashboard';

const AcademicYear = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [label, setLabel] = useState('');
    const [academicYears, setAcademicYears] = useState([]); // State for academic years

    useEffect(() => {
        // Fetch the academic years from the backend when the component mounts
        /*
        fetch('/api/academic-years/')
            .then(response => response.json())
            .then(data => setAcademicYears(data))
            .catch(error => console.error('Error fetching academic years:', error));
        */
        
        // For now, use dummy data
        setAcademicYears([
            { id: 1, start_date: '2023-08-01', end_date: '2024-07-31', label: '2023-2024' },
            { id: 2, start_date: '2022-08-01', end_date: '2023-07-31', label: '2022-2023' }
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAcademicYear = { start_date: startDate, end_date: endDate, label };
        setAcademicYears([...academicYears, newAcademicYear]);

        // Reset the form fields
        setStartDate('');
        setEndDate('');
        setLabel('');

        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Label:', label);
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
                                            placeholder='label'
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
                        <div className="mt-5">
                            <h3>Academic Years</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {academicYears.map((year, index) => (
                                        <tr key={index}>
                                            <td>{year.label}</td>
                                            <td>{year.start_date}</td>
                                            <td>{year.end_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicYear;
