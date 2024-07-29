import React, { useState, useEffect } from 'react';
import ReportService from '../../Services/ReportService';
import './Admin.css';
import AdminSidebar from './AdminSidebar';
import Header from '../Common/Header';

const Approved = () => {
    const [approvedReports, setApprovedReports] = useState([]);

    useEffect(() => {
        fetchApprovedReports();
    }, []);

    const fetchApprovedReports = async () => {
        const response = await ReportService.getApprovedReports();
        setApprovedReports(response.data);
    };

    const downloadReport = (reportId) => {
        // Implement download functionality
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Approved Reports
                            </div>

                            <div className="report-list">
                                {approvedReports.map(report => (
                                    <div key={report.id} className="report-item d-flex justify-content-between align-items-center mb-2">
                                        <span>{report.title}</span>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => downloadReport(report.id)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Approved;
