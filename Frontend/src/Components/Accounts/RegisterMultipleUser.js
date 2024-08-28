import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import { multiple_user_register } from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import homeURL from '../../axios/homeurl';

const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorFileLink, setErrorFileLink] = useState(null); // State to hold the download link
    const [successFileLink, setSuccessFileLink] = useState(null); // State to hold the download link

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);  // Reset error when file is changed
        setSuccess(null); // Reset success when file is changed
        setErrorFileLink(null); // Reset error file link when file is changed
        setSuccessFileLink(null); // Reset error file link when file is changed
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await multiple_user_register(formData);
                console.log(response)

                if (response.status === 201) {
                    setSuccess("Users registered successfully!");
                    toast.success("Users registered successfully!");


                    // Handle success report file
                    if (response.data.success_file_url) {
                        const successLink = (
                            <a href={`${homeURL}${response.data.success_file_url}`} download="success_report.csv" className="text-success mx-5">
                                Download Success Report
                            </a>
                        );
                        setSuccessFileLink(successLink);
                    }

                    // Handle error report file
                    if (response.data.error_file_url) {
                        const errorLink = (
                            <a href={`${homeURL}${response.data.error_file_url}`} download="error_report.csv" className="text-danger mx-5">
                                Download Error Report
                            </a>
                        );
                        setErrorFileLink(errorLink);
                        setError("Some users could not be registered. Please download the error report.");
                    }
                }

            } catch (err) {
                console.error("Error details:", err.response);
                setError(err.response ? err.response.data : "Failed to register users. Please check the CSV file format.");
                toast.error("Failed to register users. Please check the CSV file format.");
            }
        } else {
            setError("Please upload a CSV file.");
        }
    };

    return (
        <div>
            <ToastContainer />
            <AdminDashboard />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Users
                            </div>
                            <div className="register">

                                {/* Add "Download CSV Format" link here */}
                                <div className="d-flex justify-content-end mb-2">
                                    {/* Replace `#` with the actual link to download the CSV format */}
                                    <a href={`${homeURL}/static/sample.csv`} download="sample.csv" className="text-primary">
                                        Download CSV Format
                                    </a>
                                </div>

                                <div className="form-group mb-6">
                                    <label htmlFor="csvFile">Upload CSV File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="csvFile"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Disclaimer below the file upload */}
                                <div className="text-muted mb-6">
                                    The file should include the following columns in the same order: email, username, emp_id, ph, department, location.
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary btn-sm w-100"
                                            onClick={handleFileUpload}
                                        >
                                            Upload CSV File
                                        </button>
                                    </div>
                                </div>



                                {/* Display the error file download link */}
                                <div className="row mb-3">
                                    <div className="col-md-12" id="error">
                                        {errorFileLink}

                                        {successFileLink}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterMultipleUser;
