import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faTrash,
  faPlus,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { event_list, event_delete } from "../../axios/api";

const ProposalStatus = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const fetchPendingReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const reports = await event_list();
      setPendingReports(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  const approveEvent = (id) => {
    try {
      setPendingReports(
        pendingReports.map((event) =>
          event.id === id ? { ...event, status: "Approved" } : event
        )
      );
      toast.success("Proposal approved successfully!");
    } catch (error) {
      console.error("Error approving Proposal:", error);
      toast.error("Failed to approve Proposal. Please try again.");
    }
  };

  const rejectEvent = (id) => {
    try {
      setPendingReports(
        pendingReports.map((event) =>
          event.id === id ? { ...event, status: "Rejected" } : event
        )
      );
      toast.success("Proposal rejected successfully!");
    } catch (error) {
      console.error("Error rejecting Proposal:", error);
      toast.error("Failed to reject Proposal. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const viewReport = (reportId) => {
    console.log("View report", reportId);
  };

  const downloadReport = (reportId) => {
    console.log("Download report", reportId);
  };

  const deleteEvent = async (id) => {
    try {
      await event_delete(id);
      setPendingReports(pendingReports.filter((event) => event.id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const editReport = (reportId) => {
    navigate(`/editproposal/${reportId}`);
  };

  // Define action buttons based on status
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          className="btn btn-link"
          onClick={() => viewReport(rowData.id)}
          title="View"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>

        {rowData.status === "Pending" && (
          <>
            <button
              className="btn btn-link text-success"
              onClick={() => approveEvent(rowData.id)}
              title="Approve"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <button
              className="btn btn-link text-danger"
              onClick={() => rejectEvent(rowData.id)}
              title="Reject"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <button
              className="btn btn-link"
              onClick={() => editReport(rowData.id)}
              title="Edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </>
        )}

        {rowData.status === "Rejected" && (
          <button
            className="btn btn-link"
            onClick={() => editReport(rowData.id)}
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}

        {rowData.status === "Approved" && (
          <>
            <button
              className="btn btn-link"
              onClick={() => downloadReport(rowData.id)}
              title="Download"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>

            <button
              className="btn btn-link"
              onClick={() => editReport(rowData.id)}
              title="Edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </>
        )}

        {rowData.status !== "Approved" && (
          <button
            className="btn btn-link text-danger"
            onClick={() => deleteEvent(rowData.id)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}

        <button
          className="btn btn-link"
          onClick={() => navigate("/addreport")}
          title="Add New Report"
        >
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
              <h4 className="fw-bold text-center">Event Proposal Status</h4>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="input-group" style={{ width: "300px" }}>
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
                <Column
                  field="event_title"
                  header="Event Title"
                  filter
                  filterPlaceholder="Search title"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="status"
                  header="Status"
                  filter
                  filterPlaceholder="Search status"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  header="Actions"
                  body={actionBodyTemplate}
                  style={{ minWidth: "12rem" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProposalStatus;
