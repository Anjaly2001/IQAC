import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { multiple_user_register } from '../../axios/api';
import { toast } from 'react-toastify';

import homeURL from '../../axios/homeurl';
import Sidebar from '../../Sidebar';

const RegisterMultipleUser = () => {
    // State to hold the uploaded file
    const [file, setFile] = useState(null);
    // State to track error messages
    const [error, setError] = useState(null);
    // State to track success messages
    const [success, setSuccess] = useState(null);
    // State to hold the error report download link
    const [errorFileLink, setErrorFileLink] = useState(null);
    // State to hold the success report download link
    const [successFileLink, setSuccessFileLink] = useState(null);
    // State to hold the preview data for the uploaded CSV
    const [previewData, setPreviewData] = useState([]);
    
    // State variables to track the total, success, and error counts
    const [totalCount, setTotalCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    // Function to handle file selection and change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);  // Update file state with the selected file
        setError(null);  // Reset any previous errors
        setSuccess(null); // Reset success messages
        setErrorFileLink(null); // Reset error file link if changed
        setSuccessFileLink(null); // Reset success file link if changed
        setTotalCount(0); // Reset counts for fresh file uploads
        setSuccessCount(0);
        setErrorCount(0);

        // Function to convert strings to Title Case (used for transforming certain CSV columns)
        const toTitleCase = (str) => {
            if (typeof str !== 'string') return str;
            return str
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        // Preview the content of the uploaded CSV file
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const text = event.target.result;
                const rows = text.split('\n').map(row => row.split(','));

                // Apply title case transformation to specific columns (e.g., last name)
                const transformedRows = rows.map((row, index) => {
                    if (index === 0) {
                        // Skip the first row (header row)
                        return row;
                    }
                    // Example transformation: apply title case to the second column (e.g., last name)
                    row[1] = toTitleCase(row[1]);
                    console.log(row);
                    return row;
                });

                setPreviewData(transformedRows); // Set the transformed rows for preview
            };
            reader.readAsText(selectedFile);
        }
    };

    // Function to handle the file upload and user registration
    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);  // Append file to the FormData object

            try {
                // Send the file to the API endpoint using `multiple_user_register`
                const response = await multiple_user_register(formData);
                console.log(response);

                if (response.status === 201) {
                    setSuccess("Users registered successfully!");

                    // Update count states based on the response data
                    setTotalCount(response.data.total_count || 0);
                    setSuccessCount(response.data.success_count || 0);
                    setErrorCount(response.data.error_count || 0);

                    // Handle the success report file link
                    if (response.data.success_file_url) {
                        const successLink = (
                            <a href={`${homeURL}${response.data.success_file_url}`} download="success_report.csv" className="text-success mx-5">
                                Download Success Report
                            </a>
                        );
                        setSuccessFileLink(successLink);
                    }

                    // Handle the error report file link
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
                // Handle errors in the request and display an appropriate error message
                console.error("Error details:", err.response);
                setError(err.response ? err.response.data : "Failed to register users. Please check the CSV file format.");
                toast.error("Failed to register users. Please check the CSV file format.");
            }
        } else {
            // If no file is selected, show an error
            setError("Please upload a CSV file.");
        }
    };

    // Utility function to render a red asterisk for required fields
    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        <Sidebar /> {/* Sidebar component */}
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Register Users
                            </div>
                            <div className="register">

                                {/* Link to download the sample CSV format */}
                                <div className="d-flex justify-content-end mb-2">
                                    <a href={`${homeURL}/static/sample.csv`} download="sample.csv" className="text-primary">
                                        Download CSV Format
                                    </a>
                                </div>

                                {/* File upload input field */}
                                <div className="form-group mb-6">
                                    <label htmlFor="csvFile">Upload CSV File{renderAsterisk()}</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="csvFile"
                                        onChange={handleFileChange} // Handle file changes
                                    />
                                </div>

                                {/* Disclaimer for file format */}
                                <div className="text-muted mb-6">
                                    The file should include the following columns in the same order: email, first_name, last_name, emp_id, ph, department, location.
                                </div>

                                {/* Preview of the uploaded CSV file */}
                                {previewData.length > 0 && (
                                    <div className="mt-3">
                                        <h5>Preview</h5>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    {previewData[0].map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {previewData.slice(1).map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Button to upload the file */}
                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary btn-sm w-100"
                                            onClick={handleFileUpload} // Trigger file upload
                                        >
                                            Upload CSV File
                                        </button>
                                    </div>
                                </div>

                                {/* Links to download success or error report */}
                                <div className="row mb-3">
                                    <div className="col-md-12" id="error">
                                        {errorFileLink}
                                        {successFileLink}
                                    </div>
                                </div>

                                {/* Error and success message display */}
                                {error && <div className="text-danger">{error}</div>}
                                {success && <div className="text-success">{success}</div>}

                                {/* Display counts of total, success, and error */}
                                {totalCount > 0 && (
                                    <div className="mt-3">
                                        <h5>Upload Summary</h5>
                                        <p>Total Count: {totalCount}</p>
                                        <p>Success Count: {successCount}</p>
                                        <p>Error Count: {errorCount}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterMultipleUser;
