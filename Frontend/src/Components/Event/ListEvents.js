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
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Ensure this line is present
import { ToastContainer, toast } from 'react-toastify';
import { fetchEventProposalsByDepartment,event_delete } from '../../axios/api';
import axios from 'axios';



const ListEvents = ({ departmentId }) => {
  const [pendingReports, setPendingReports] = useState([]);
  // const [filteredReports, setFilteredReports] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (departmentId) {  // Ensure departmentId exists before fetching
      fetchPendingReports(departmentId);  // Pass departmentId to fetchPendingReports
    }
  }, [departmentId]);

  const fetchPendingReports = async (deptId) => {
    setLoading(true);  // Start loading
    setError(null);    // Clear previous errors

    try {
      const reports = await fetchEventProposalsByDepartment(deptId); // Pass department ID to API
      setPendingReports(reports); // Set the reports data in state
    } catch (error) {
      console.error('Error fetching event proposals:', error);
      setError('Failed to fetch event proposals.'); // Set error state
    } finally {
      setLoading(false); // End loading
    }
  };


  const approveEvent = (id) => {
    try {
      // Assuming you will make an API call to approve the event in the future
      // const response = await event_update_status(id, 'Approved');
      
      // For now, just update the state locally
      setPendingReports(
        pendingReports.map(event =>
          event.id === id ? { ...event, status: 'Approved' } : event
        )
      );
      toast.success('Event approved successfully!');
    } catch (error) {
      console.error('Error approving event:', error);
      toast.error('Failed to approve event. Please try again.');
    }
  };
  
  const rejectEvent = (id) => {
    try {
      // Assuming you will make an API call to reject the event in the future
      // const response = await event_update_status(id, 'Rejected');
      
      // For now, just update the state locally
      setPendingReports(
        pendingReports.map(event =>
          event.id === id ? { ...event, status: 'Rejected' } : event
        )
      );
      toast.success('Event rejected successfully!');
    } catch (error) {
      console.error('Error rejecting event:', error);
      toast.error('Failed to reject event. Please try again.');
    }
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

  const deleteEvent = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await event_delete(id);
      setPendingReports(pendingReports.filter(event => event.id !== id)); // Update state
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event. Please try again.');
    }
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
        {rowData.status === 'Pending' && (
        <>
<button className="btn btn-link text-success" onClick={() => approveEvent(rowData.id)} style={{ border: '1px solid red' }}>
  <FontAwesomeIcon icon={faCheck} />
</button>

          <button className="btn btn-link text-danger" onClick={() => rejectEvent(rowData.id)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      )}
        {rowData.status !== 'Approved' && (
          <button className="btn btn-link text-danger" onClick={() => deleteEvent(rowData.id)}>
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
                value={pendingReports}
                paginator 
                rows={10} 
                dataKey="id" 
                globalFilter={globalFilter}
                emptyMessage="No events found."
              >
                <Column field="event_title" header="Event Title" filter filterPlaceholder="Search title" style={{ minWidth: '12rem' }} />
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
