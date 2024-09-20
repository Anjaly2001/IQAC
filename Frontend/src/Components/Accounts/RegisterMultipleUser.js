import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { multiple_user_register } from '../../axios/api';
import { toast } from 'react-toastify';
import homeURL from '../../axios/homeurl';
import Sidebar from '../../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
                accept=".csv"
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

// UploadSummaryTable Component
const UploadSummaryTable = ({ totalCount, successCount, errorCount }) => {
    // Prepare data for the DataTable
    const summaryData = [
        {
            total: totalCount,
            success: successCount,
            error: errorCount,
        },
    ];

    return (
        totalCount > 0 && (
            <div className="mt-3">
                <h5>Upload Summary</h5>
                <DataTable value={summaryData} tableStyle={{ minWidth: '50rem' }}>
                    <Column
                        field="total"
                        header="Total Count"
                        style={{ width: '33%' }}
                        bodyStyle={{ alignContent: 'center' }}
                    ></Column>
                    <Column
                        field="success"
                        header="Success Count"
                        style={{ width: '33%' }}
                        bodyStyle={{ alignContent: 'center' }}
                    ></Column>
                    <Column
                        field="error"
                        header="Error Count"
                        style={{ width: '33%' }}
                        bodyStyle={{ alignContent: 'center' }}
                    ></Column>
                </DataTable>
            </div>
        )
    );
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            row[1] = toTitleCase(row[1]); // first_name
            row[2] = toTitleCase(row[2]); // last_name
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

            setIsSubmitting(true);

            try {
                const response = await multiple_user_register(formData); // 30 seconds
                if (response.status === 201) {
                    handleSuccess(response);
                }
            } catch (err) {
                handleError(err);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setError("Please upload a CSV file.");
        }
    };

// In the handleSuccess function
const handleSuccess = (response) => {
    setSuccess("Registration Complete! Users were successfully registered.");
    setTotalCount(response.data.total_count || 0);
    setSuccessCount(response.data.success_count || 0);
    setErrorCount(response.data.error_count || 0);

    if (response.data.success_file_url) {
        setSuccessFileLink(renderFileLink(
            response.data.success_file_url, "Download Success Report", "btn-success"));
    }
    if (response.data.error_file_url) {
        setErrorFileLink(renderFileLink(
            response.data.error_file_url, "Download Error Report", "btn-danger"));
        setError("Some users could not be registered.");
    }
};

    const handleError = (err) => {
        if (err.code === 'ECONNABORTED') {
            setError("Request timed out. Please try again later.");
            toast.error("Request timed out. Please try again later.");
        } else if (err.response && err.response.data) {
            setError(err.response.data.error || "Failed to register users. Please check the CSV file format.");
            toast.error(err.response.data.error || "Failed to register users. Please check the CSV file format.");
        } else {
            console.log(err)
            setError("Failed to register users. Please check the CSV file format.");
            toast.error("Failed to register users. Please check the CSV file format.");
        }
        console.log(err); // Log the error for debugging
    };

    const renderFileLink = (url, text, className) => {
        return (
            <button 
                className={`btn ${className} mx-5`} 
                onClick={() => window.open(`${homeURL}${url}`)}
            >
                {text} <FontAwesomeIcon icon={faDownload} />
            </button>
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
                                    The file should include the following columns in the same order: email, first_name, last_name, emp_id, phone_number, department, location.
                                </div>

                                {/* CSV Preview */}
                                <CSVPreviewTable previewData={previewData} />

                                {/* Upload button */}
                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <button className="btn btn-primary btn-sm w-100" onClick={handleFileUpload} disabled={isSubmitting}>
                                            {isSubmitting ? "Uploading..." : "Upload CSV File"}
                                        </button>
                                    </div>
                                </div>  

                                <div className="d-flex justify-content-between align-items-center">
                                                                        
                                        {/* Error Message and Download Link (Left) */}
                                        <div className="d-flex flex-column align-items-start">
                                            {error && (
                                                <>
                                                    <div className="text-danger mb-2">{error}</div>
                                                    {errorFileLink && (
                                                        <div className="box-style text-danger">
                                                            {errorFileLink}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        {/* Success Message and Download Link (Right) */}
                                        <div className="d-flex flex-column align-items-end">
                                            {success && (
                                                <>
                                                    <div className="text-success mb-2">{success}</div>
                                                    {successFileLink && (
                                                        <div className="box-style text-success">
                                                            {successFileLink}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                {/* Upload Summary */}
                                <UploadSummaryTable
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
