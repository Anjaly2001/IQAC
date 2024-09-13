import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { multiple_user_register } from '../../axios/api';
import { toast } from 'react-toastify';
import homeURL from '../../axios/homeurl';
import Sidebar from '../../Sidebar';

// FileInput Component
const FileInput = ({ onFileChange }) => {
    return (
        <div className="form-group mb-6">
            <label htmlFor="csvFile">
                Upload CSV File<span style={{ color: 'red' }}>*</span>
            </label>
            <input
                type="file"
                className="form-control"
                id="csvFile"
                onChange={onFileChange}
            />
        </div>
    );
};

// CSVPreviewTable Component
const CSVPreviewTable = ({ previewData }) => {
    return previewData.length > 0 ? (
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
    ) : null;
};

// MessageDisplay Component
const MessageDisplay = ({ error, success, errorFileLink, successFileLink }) => {
    return (
        <div>
            {error && <div className="text-danger">{error}</div>}
            {success && <div className="text-success">{success}</div>}
            {errorFileLink}
            {successFileLink}
        </div>
    );
};

// UploadSummary Component
const UploadSummary = ({ totalCount, successCount, errorCount }) => {
    return totalCount > 0 ? (
        <div className="mt-3">
            <h5>Upload Summary</h5>
            <p>Total Count: {totalCount}</p>
            <p>Success Count: {successCount}</p>
            <p>Error Count: {errorCount}</p>
        </div>
    ) : null;
};

// Main Component: RegisterMultipleUser
const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorFileLink, setErrorFileLink] = useState(null);
    const [successFileLink, setSuccessFileLink] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        resetStates();

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target.result;
                const rows = text.split('\n').map(row => row.split(','));
                const transformedRows = transformRows(rows);
                setPreviewData(transformedRows);
            };
            reader.readAsText(selectedFile);
        }
    };

    const transformRows = (rows) => {
        return rows.map((row, index) => {
            if (index === 0) return row;
            row[1] = toTitleCase(row[1]);
            return row;
        });
    };

    const toTitleCase = (str) => {
        return typeof str === 'string' 
            ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : str;
    };

    const resetStates = () => {
        setError(null);
        setSuccess(null);
        setErrorFileLink(null);
        setSuccessFileLink(null);
        setTotalCount(0);
        setSuccessCount(0);
        setErrorCount(0);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await multiple_user_register(formData);
                if (response.status === 201) {
                    handleSuccess(response);
                }
            } catch (err) {
                handleError(err);
            }
        } else {
            setError("Please upload a CSV file.");
        }
    };

    const handleSuccess = (response) => {
        setSuccess("Users registered successfully!");
        setTotalCount(response.data.total_count || 0);
        setSuccessCount(response.data.success_count || 0);
        setErrorCount(response.data.error_count || 0);

        if (response.data.success_file_url) {
            setSuccessFileLink(renderFileLink(response.data.success_file_url, "Download Success Report", "text-success"));
        }
        if (response.data.error_file_url) {
            setErrorFileLink(renderFileLink(response.data.error_file_url, "Download Error Report", "text-danger"));
            setError("Some users could not be registered. Please download the error report.");
        }
    };

    const handleError = (err) => {
        setError(err.response ? err.response.data : "Failed to register users. Please check the CSV file format.");
        toast.error("Failed to register users. Please check the CSV file format.");
    };

    const renderFileLink = (url, text, className) => {
        return (
            <a href={`${homeURL}${url}`} download className={`${className} mx-5`}>
                {text}
            </a>
        );
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        <Sidebar />
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">Register Users</div>
                            <div className="register">

                                {/* Link to download the sample CSV format */}
                                <div className="d-flex justify-content-end mb-2">
                                    <a href={`${homeURL}/static/sample.csv`} download="sample.csv" className="text-primary">
                                        Download CSV Format
                                    </a>
                                </div>

                                {/* File input field */}
                                <FileInput onFileChange={handleFileChange} />

                                {/* Disclaimer */}
                                <div className="text-muted mb-6">
                                    The file should include the following columns in the same order: email, first_name, last_name, emp_id, ph, department, location.
                                </div>

                                {/* CSV Preview */}
                                <CSVPreviewTable previewData={previewData} />

                                {/* Upload button */}
                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <button className="btn btn-primary btn-sm w-100" onClick={handleFileUpload}>
                                            Upload CSV File
                                        </button>
                                    </div>
                                </div>

                                {/* Error/Success message display */}
                                <MessageDisplay
                                    error={error}
                                    success={success}
                                    errorFileLink={errorFileLink}
                                    successFileLink={successFileLink}
                                />

                                {/* Upload Summary */}
                                <UploadSummary
                                    totalCount={totalCount}
                                    successCount={successCount}
                                    errorCount={errorCount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterMultipleUser;