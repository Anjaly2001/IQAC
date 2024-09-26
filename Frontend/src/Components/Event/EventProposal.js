import React, { useState } from "react";
import "./EventProposal.css"; // External CSS file for styling
import Sidebar from "../../Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventProposal = () => {
  const [logo, setLogo] = useState(null);
  const [startDate, setStartDate] = useState(new Date()); // State for date and time
  const [activities, setActivities] = useState(1); // State for number of activities

  // Handle logo upload and preview
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setLogo(logoUrl);
    }
  };

  // Handle number of activities increase and decrease
  const handleActivitiesChange = (action) => {
    if (action === "increase") {
      setActivities(activities + 1);
    } else if (action === "decrease" && activities > 1) {
      setActivities(activities - 1);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="event-proposal-container">
          {/* Logo Upload */}
          <div className="logo-upload-container">
            {logo ? (
              <img src={logo} alt="Uploaded Logo" className="logo" />
            ) : (
              <div className="logo-placeholder">Logo Preview</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="logo-upload-input"
            />
          </div>

          {/* Blue line */}
          <hr className="blue-line" />

          {/* Event Proposal Title */}
          <h2 className="event-proposal-title">EVENT PROPOSAL</h2>

          {/* Table for Event Information */}
          <table className="event-info-table">
            <thead>
              <tr>
                <th colSpan="2" className="table-header">
                  EVENT INFORMATION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Department</td>
                <td>
                  <select className="form-control">
                    <option>Select Department</option>
                    <option>Computer Science</option>
                    <option>Management</option>
                    <option>Commerce</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Event Title</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Event Title"
                  />
                </td>
              </tr>
              <tr>
                <td>No of Activities</td>
                <td>
                  <div className="activities-control">
                    <input
                      type="number"
                      className="form-control activities-input"
                      value={activities}
                      readOnly
                    />
                    <div className="activities-buttons">
                      <button
                        className="btn btn-secondary activities-btn up-arrow"
                        onClick={() => handleActivitiesChange("increase")}
                      >
                        ▲
                      </button>
                      <button
                        className="btn btn-secondary activities-btn down-arrow"
                        onClick={() => handleActivitiesChange("decrease")}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td>Date and Time</td>
                <td>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Venue</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Venue"
                  />
                </td>
              </tr>
              <tr>
                <td>Academic Year</td>
                <td>
                  <select className="form-control">
                    <option>Select Academic Year</option>
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Event Type (Focus)</td>
                <td>
                  <select className="form-control">
                    <option>Select Event Type</option>
                    <option>Seminar</option>
                    <option>Workshop</option>
                    <option>Conference</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventProposal;
