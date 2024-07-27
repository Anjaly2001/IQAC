import React, { useState, useEffect } from 'react';
import ReportService from '../../Services/ReportService';
import './Admin.css';

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
        <div className="pending">
            <h2>Pending Reports</h2>
            <div className="report-list">
                {pendingReports.map(report => (
                    <div key={report.id} className="report-item">
                        <span>{report.title}</span>
                        <button onClick={() => viewReport(report.id)}>View</button>
                        <button onClick={() => downloadReport(report.id)}>Download</button>
                        <button onClick={() => approveReport(report.id)}>Approve</button>
                        <button onClick={() => rejectReport(report.id)}>Reject</button>
                        <button onClick={() => sendComment(report.id, "Your comment here")}>Comment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pending;
