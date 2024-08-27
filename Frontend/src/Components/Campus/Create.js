import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing passed state
import Axios from 'axios';
import AdminDashboard from '../Admin/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { campus_register } from '../../axios/api';

const CreateCampus = () => {
    const location = useLocation(); // Access the location object
    const [campusName, setCampusName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState('');
    const [campuses, setCampuses] = useState([]);
    const [isEdit, setIsEdit] = useState(false); // New state to check if editing

    const token = localStorage.getItem('access_token'); // Assuming token is stored in local storage

    useEffect(() => {
        if (location.state && location.state.campus) {
            const { campus } = location.state;
            setCampusName(campus.name);
            setLogoName(campus.logo); // Assuming you have a way to display the logo filename
            setIsEdit(true); // Set the editing state
        }
    }, [location.state]);

    const handleCreateCampus = async () => {
        if (campusName && (logo || isEdit)) { // Allow proceeding if editing without changing the logo
            const formData = new FormData();
            formData.append('campus', campusName); // Backend expects "campus"
            if (logo) formData.append('logo', logo); // Only append logo if it's selected

            try {
                const response = await campus_register(formData);

                if (response && response.exist) {
                    toast.error('Campus name already exists!');
                } else {
                    const newCampus = response;
                    setCampuses([...campuses, newCampus]);
                    setCampusName('');
                    setLogo(null);
                    setLogoName('');
                    toast.success(isEdit ? 'Campus updated successfully!' : 'Campus created successfully!');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response);
                } else {
                    console.error('Error:', error.message);
                    toast.error('An error occurred. Please try again.');
                }
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        setLogoName(file ? file.name : '');
    };

    return (
        <div>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-6 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                {isEdit ? 'Edit Campus' : 'Create Campus'}
                            </div>
                            <div className="register">
                                <div className="campus-actions mb-4">
                                    <div className="mb-3">
                                        <label htmlFor="campusName" className="form-label">Campus Name</label>
                                        <input
                                            type="text"
                                            id="campusName"
                                            className="form-control same-width"
                                            placeholder="Enter Campus Name"
                                            value={campusName}
                                            onChange={(e) => setCampusName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="logo" className="form-label">Logo</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="file"
                                                id="logo"
                                                className="form-control same-width"
                                                onChange={handleLogoChange}
                                            />
                                            <label htmlFor="logo" className="ms-2">
                                                {logoName}
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={handleCreateCampus}
                                    >
                                        {isEdit ? 'Update Campus' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateCampus;
