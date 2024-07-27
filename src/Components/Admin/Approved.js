import React, { useState, useEffect } from 'react';
import ReportService from '../../Services/ReportService';
import './Admin.css';

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
        <div className="approved">
            <h2>Approved Reports</h2>
            <div className="report-list">
                {approvedReports.map(report => (
                    <div key={report.id} className="report-item">
                        <span>{report.title}</span>
                        <button onClick={() => downloadReport(report.id)}>Download</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Approved;
