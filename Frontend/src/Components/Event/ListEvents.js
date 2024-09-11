import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../Sidebar';

const ListEvents = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const fetchPendingReports = () => {
    const reports = [
      { id: 1, title: 'Report 1', department: 'Data Science', collaborators: 'Dhaksh, Arohi', status: 'Pending' },
      { id: 2, title: 'Report 2', department: 'Language', collaborators: 'Rudre, Jack', status: 'Approved' },
      { id: 3, title: 'Report 3', department: 'Law', collaborators: 'Albert, Aljo', status: 'Rejected' },
    ];
    setPendingReports(reports);
    setFilteredReports(reports);
  };

  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const viewReport = (reportId) => {
    console.log('View report', reportId);
  };

  const downloadReport = (reportId) => {
    console.log('Download report', reportId);
  };

  const deleteReport = (reportId) => {
    console.log('Delete report', reportId);
  };

  const editReport = (reportId) => {
    console.log('Edit report', reportId);
    navigate(`/editreport/${reportId}`);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button className="btn btn-link" onClick={() => viewReport(rowData.id)}>
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="btn btn-link" onClick={() => downloadReport(rowData.id)}>
          <FontAwesomeIcon icon={faDownload} />
        </button>
        <button className="btn btn-link" onClick={() => editReport(rowData.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {rowData.status !== 'Approved' && (
          <button className="btn btn-link text-danger" onClick={() => deleteReport(rowData.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        <button className="btn btn-link" onClick={() => navigate('/addreport')}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10 mt-5 pt-5 p-6">
          <div className="container mt-3">
            <div className="d-flex justify-content-center mb-4">
              <h4 className="fw-bold text-center">Event List</h4>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="input-group" style={{ width: '300px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search reports"
                  value={globalFilter}
                  onChange={handleSearchChange}
                />
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <DataTable 
                value={filteredReports}
                paginator 
                rows={10} 
                dataKey="id" 
                globalFilter={globalFilter}
                emptyMessage="No events found."
              >
                <Column field="title" header="Event Title" filter filterPlaceholder="Search title" style={{ minWidth: '12rem' }} />
                <Column field="collaborators" header="Collaborators" filter filterPlaceholder="Search collaborators" style={{ minWidth: '12rem' }} />
                <Column field="status" header="Status" filter filterPlaceholder="Search status" style={{ minWidth: '12rem' }} />
                <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEvents;
