import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { multiple_user_register } from '../../axios/api';
import {  toast } from 'react-toastify';

import homeURL from '../../axios/homeurl';
import Sidebar from '../../Sidebar';

const RegisterMultipleUser = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorFileLink, setErrorFileLink] = useState(null); // State to hold the download link
    const [successFileLink, setSuccessFileLink] = useState(null); // State to hold the download link
    const [previewData, setPreviewData] = useState([]); // State to hold the preview data

    // New state variables for counts
    const [totalCount, setTotalCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);  // Reset error when file is changed
        setSuccess(null); // Reset success when file is changed
        setErrorFileLink(null); // Reset error file link when file is changed
        setSuccessFileLink(null); // Reset error file link when file is changed
        setTotalCount(0); // Reset counts
        setSuccessCount(0);
        setErrorCount(0);

        const toTitleCase = (str) => {
            if (typeof str !== 'string') return str; 
            return str
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const text = event.target.result;
                const rows = text.split('\n').map(row => row.split(','));

                // Apply title case to specific columns (e.g., assuming first and last name are columns 0 and 1)
                const transformedRows = rows.map((row, index)=> {
                    if (index === 0) {
                        // Skip the first row (headers)
                        return row;
                    }
                    // row[0] = toTitleCase(row[0]); // Apply title case to the first column (e.g., first name)
                    row[1] = toTitleCase(row[1]); // Apply title case to the second column (e.g., last name)
                    console.log(row)
                    return row;
                });

                setPreviewData(transformedRows); // Update preview data with transformed rows
            };
            reader.readAsText(selectedFile);
        }   
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await multiple_user_register(formData);
                console.log(response);

                if (response.status === 201) {
                    setSuccess("Users registered successfully!");
                    // toast.success("Users registered successfully!");

                    // Update counts from response
                    setTotalCount(response.data.total_count || 0);
                    setSuccessCount(response.data.success_count || 0);
                    setErrorCount(response.data.error_count || 0);

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

    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
            <Sidebar />

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
                                    <label htmlFor="csvFile">Upload CSV File{renderAsterisk()}</label>
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

                                {/* Preview Table */}
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

                                {/* Error and success messages */}
                                {error && <div className="text-danger">{error}</div>}
                                {success && <div className="text-success">{success}</div>}

                                {/* Display counts */}
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





// import React, { useState } from 'react';
// import AdminDashboard from '../Admin/AdminDashboard';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { multiple_user_register } from '../../axios/api';
// import { ToastContainer, toast } from 'react-toastify';
// 
// import homeURL from '../../axios/homeurl';

// const RegisterMultipleUser = () => {
//     const [file, setFile] = useState(null);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [errorFileLink, setErrorFileLink] = useState(null); // State to hold the download link
//     const [successFileLink, setSuccessFileLink] = useState(null); // State to hold the download link

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         setError(null);  // Reset error when file is changed
//         setSuccess(null); // Reset success when file is changed
//         setErrorFileLink(null); // Reset error file link when file is changed
//         setSuccessFileLink(null); // Reset error file link when file is changed
//     };

//     const handleFileUpload = async () => {
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);

//             try {
//                 const response = await multiple_user_register(formData);
//                 console.log(response)

//                 if (response.status === 201) {
//                     setSuccess("Users registered successfully!");
//                     toast.success("Users registered successfully!");


//                     // Handle success report file
//                     if (response.data.success_file_url) {
//                         const successLink = (
//                             <a href={`${homeURL}${response.data.success_file_url}`} download="success_report.csv" className="text-success mx-5">
//                                 Download Success Report
//                             </a>
//                         );
//                         setSuccessFileLink(successLink);
//                     }

//                     // Handle error report file
//                     if (response.data.error_file_url) {
//                         const errorLink = (
//                             <a href={`${homeURL}${response.data.error_file_url}`} download="error_report.csv" className="text-danger mx-5">
//                                 Download Error Report
//                             </a>
//                         );
//                         setErrorFileLink(errorLink);
//                         setError("Some users could not be registered. Please download the error report.");
//                     }
//                 }

//             } catch (err) {
//                 console.error("Error details:", err.response);
//                 setError(err.response ? err.response.data : "Failed to register users. Please check the CSV file format.");
//                 toast.error("Failed to register users. Please check the CSV file format.");
//             }
//         } else {
//             setError("Please upload a CSV file.");
//         }
//     };

//     const renderAsterisk = () => (
//         <span style={{ color: 'red' }}>*</span>
//     );
//     return (
//         <div>
//             <ToastContainer />
//             <AdminDashboard />
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-3 justify-content-center p-0">
//                         {/* Sidebar or other components can go here */}
//                     </div>
//                     <div className="col-md-8 mt-1 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">
//                                 Register Users
//                             </div>
//                             <div className="register">

//                                 {/* Add "Download CSV Format" link here */}
//                                 <div className="d-flex justify-content-end mb-2">
//                                     {/* Replace `#` with the actual link to download the CSV format */}
//                                     <a href={`${homeURL}/static/sample.csv`} download="sample.csv" className="text-primary">
//                                         Download CSV Format
//                                     </a>
//                                 </div>

//                                 <div className="form-group mb-6">
//                                     <label htmlFor="csvFile">Upload CSV File{renderAsterisk()}</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="csvFile"
//                                         onChange={handleFileChange}
//                                     />
//                                 </div>

//                                 {/* Disclaimer below the file upload */}
//                                 <div className="text-muted mb-6">
//                                     The file should include the following columns in the same order: email, username, emp_id, ph, department, location.
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-md-2">
//                                         <button
//                                             className="btn btn-primary btn-sm w-100"
//                                             onClick={handleFileUpload}
//                                         >
//                                             Upload CSV File
//                                         </button>
//                                     </div>
//                                 </div>



//                                 {/* Display the error file download link */}
//                                 <div className="row mb-3">
//                                     <div className="col-md-12" id="error">
//                                         {errorFileLink}

//                                         {successFileLink}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterMultipleUser;
    



// import React, { useState } from 'react';
// import AdminDashboard from '../Admin/AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { multiple_user_register } from '../../axios/api';
// import { ToastContainer, toast } from 'react-toastify';
// 
// import homeURL from '../../axios/homeurl';
// import Papa from 'papaparse';

// const RegisterMultipleUser = () => {
//     const [file, setFile] = useState(null);
//     const [csvData, setCsvData] = useState([]);
//     const [totalCount, setTotalCount] = useState(0);
//     const [errorCount, setErrorCount] = useState(0);
//     const [successCount, setSuccessCount] = useState(0);
//     const [errorFileLink, setErrorFileLink] = useState(null);
//     const [successFileLink, setSuccessFileLink] = useState(null);
//     const [error, setError] = useState(null);  // Missing useState hook
//     const [success, setSuccess] = useState(null);  // Missing useState hook

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//         setErrorFileLink(null);
//         setSuccessFileLink(null);

//         // Parse the CSV file and store the data
//         Papa.parse(selectedFile, {
//             header: true,
//             complete: (result) => {
//                 setCsvData(result.data);
//                 setTotalCount(result.data.length);
//                 setErrorCount(0); // Reset error count when a new file is selected
//                 setSuccessCount(0); // Reset success count when a new file is selected
//             },
//             error: (error) => {
//                 console.error("Error parsing CSV file:", error);
//                 setError("Failed to parse CSV file. Please check the file format.");
//                 toast.error("Failed to parse CSV file. Please check the file format.");
//             }
//         });
//     };

//     const handleFileUpload = async () => {
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);

//             try {
//                 const response = await multiple_user_register(formData);

//                 if (response.status === 201) {
//                     setSuccess("Users registered successfully!");
//                     toast.success("Users registered successfully!");

//                     // Update counts based on response
//                     setSuccessCount(response.data.success_count);
//                     setErrorCount(response.data.error_count);

//                     // Handle success report file
//                     if (response.data.success_file_url) {
//                         const successLink = (
//                             <a href={`${homeURL}${response.data.success_file_url}`} download="success_report.csv" className="text-success mx-5">
//                                 Download Success Report
//                             </a>
//                         );
//                         setSuccessFileLink(successLink);
//                     }

//                     // Handle error report file
//                     if (response.data.error_file_url) {
//                         const errorLink = (
//                             <a href={`${homeURL}${response.data.error_file_url}`} download="error_report.csv" className="text-danger mx-5">
//                                 Download Error Report
//                             </a>
//                         );
//                         setErrorFileLink(errorLink);
//                         setError("Some users could not be registered. Please download the error report.");
//                     }
//                 }
//             } catch (err) {
//                 console.error("Error details:", err.response);
//                 setError(err.response ? err.response.data : "Failed to register users. Please check the CSV file format.");
//                 toast.error("Failed to register users. Please check the CSV file format.");
//             }
//         } else {
//             setError("Please upload a CSV file.");
//         }
//     };

//     const renderAsterisk = () => (
//         <span style={{ color: 'red' }}>*</span>
//     );

//     return (
//         <div>
//             <ToastContainer />
//             <AdminDashboard />
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-3 justify-content-center p-0">
//                         {/* Sidebar or other components can go here */}
//                     </div>
//                     <div className="col-md-8 mt-1 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">
//                                 Register Users
//                             </div>
//                             <div className="register">
//                                 <div className="d-flex justify-content-end mb-2">
//                                     <a href={`${homeURL}/static/sample.csv`} download="sample.csv" className="text-primary">
//                                         Download CSV Format
//                                     </a>
//                                 </div>

//                                 <div className="form-group mb-6">
//                                     <label htmlFor="csvFile">Upload CSV File{renderAsterisk()}</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="csvFile"
//                                         onChange={handleFileChange}
//                                     />
//                                 </div>

//                                 {/* Preview CSV Data */}
//                                 {csvData.length > 0 && (
//                                     <div className="mb-4">
//                                         <h6>CSV Preview (First 5 rows):</h6>
//                                         <table className="table table-striped table-bordered">
//                                             <thead>
//                                                 <tr>
//                                                     {Object.keys(csvData[0]).map((key, index) => (
//                                                         <th key={index}>{key}</th>
//                                                     ))}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {csvData.slice(0, 5).map((row, index) => (
//                                                     <tr key={index}>
//                                                         {Object.values(row).map((value, index) => (
//                                                             <td key={index}>{value}</td>
//                                                         ))}
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}

//                                 <div className="text-muted mb-6">
//                                     The file should include the following columns in the same order: email, username, emp_id, ph, department, location.
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-md-2">
//                                         <button
//                                             className="btn btn-primary btn-sm w-100"
//                                             onClick={handleFileUpload}
//                                         >
//                                             Upload CSV File
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Display Upload Counts */}
//                                 <div className="mb-3">
//                                     <strong>Total Records:</strong> {totalCount}<br />
//                                     <strong>Success Count:</strong> {successCount}<br />
//                                     <strong>Error Count:</strong> {errorCount}
//                                 </div>

//                                 {/* Display the error and success file download links */}
//                                 <div className="row mb-3">
//                                     <div className="col-md-12" id="error">
//                                         {errorFileLink}
//                                         {successFileLink}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterMultipleUser;
