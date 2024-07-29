import React, { useState, useEffect } from 'react';
import ReportService from '../../Services/ReportService';
import './Head.css';
import Header from '../Common/Header';
import HeadSidebar from './HeadSidebar';

const Pending = () => {
    const [pendingReports, setPendingReports] = useState([]);

    useEffect(() => {
        fetchPendingReports();
    }, []);

    const fetchPendingReports = async () => {
        const response = await ReportService.getPendingReports();
        setPendingReports(response.data);
    };

    const viewReport = (reportId) => {
        // Implement view functionality
    };

    const downloadReport = (reportId) => {
        // Implement download functionality
    };

    const approveReport = (reportId) => {
        // Implement approve functionality
    };

    const rejectReport = (reportId) => {
        // Implement reject functionality
    };

    const sendComment = (reportId, comment) => {
        // Implement comment functionality
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <HeadSidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Pending Reports
                            </div>
                            <div className="report-list">
                                {pendingReports.map(report => (
                                    <div key={report.id} className="report-item d-flex justify-content-between align-items-center mb-2">
                                        <span>{report.title}</span>
                                        <div>
                                            <button className="btn btn-primary me-2" onClick={() => viewReport(report.id)}>View</button>
                                            <button className="btn btn-secondary me-2" onClick={() => downloadReport(report.id)}>Download</button>
                                            <button className="btn btn-success me-2" onClick={() => approveReport(report.id)}>Approve</button>
                                            <button className="btn btn-danger me-2" onClick={() => rejectReport(report.id)}>Reject</button>
                                            <button className="btn btn-info" onClick={() => sendComment(report.id, "Your comment here")}>Comment</button>
                                        </div>
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

export default Pending;
