import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./EventProposal.css"; // External CSS file for styling
import Sidebar from "../../Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "primereact/editor";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

const EventProposal = () => {
  const [startDate, setStartDate] = useState(new Date()); // State for date and time
  const [endDate, setEndDate] = useState(new Date()); // State for date and time
  const [activities, setActivities] = useState(1); // State for number of activities
  const renderAsterisk = () => <span style={{ color: "red" }}>*</span>;
  const [description, setDescription] = useState("");
  const stepperRef = useRef(null);
  const [Objective, setObjective] = useState("");
  const [Outcome, setOutcome] = useState("");
  const [Profile, setProfile] = useState("");
  // const [isApproved, setIsApproved] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    stepperRef.current.nextCallback(); // Call nextCallback
    navigate('/proposalstatus'); // Navigate to the desired page
  };

  // // Function to handle approval (this can be tied to your approval logic)
  // const handleApproval = () => {
  //   setIsApproved(true); // Set to true when the form is approved
  // };

  // State to track the selected option from the dropdown
  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle dropdown change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
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
        <Stepper ref={stepperRef} style={{ flexBasis: "80rem" }}>
          <StepperPanel header=" ">
            <div className="event-proposal-container">
              {/* Logo
              <div className="logo-container">
                <img src={logo} alt="Organization Logo" className="logo" />
              </div> */}

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
                    <td>Start Date and Time</td>
                    <td>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="form-control"
                        placeholderText="Select Start Date and Time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>End Date and Time</td>
                    <td>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="form-control"
                        placeholderText="Select End Date and Time"
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
                    <td>Event Type</td>
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

            <div className="need-analysis-container">
              <table className="need-analysis-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="need-analysis-header">
                      NEED ANALYSIS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <div className="mb-3">
                      <Editor
                        id="description"
                        value={description}
                        onTextChange={(e) => setDescription(e.htmlValue)}
                        className="description-editor"
                        style={{ height: "150px" }}
                        placeholder="Enter your analysis here..."
                      />
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header=" ">
            <div className="mb-3">
              <label className="form-label">OBJECTIVES{renderAsterisk()}</label>
              <Editor
                value={Objective}
                onTextChange={(e) => setObjective(e.htmlValue)}
                style={{ height: "150px" }}
                placeholder="Enter your Objective here..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                EXPECTED OUTCOME{renderAsterisk()}
              </label>
              <Editor
                value={Outcome}
                onTextChange={(e) => setOutcome(e.htmlValue)}
                style={{ height: "150px" }}
                placeholder="Enter your Expected Outcome here..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">SPEAKER PROFILE</label>
              <Editor
                value={Profile}
                onTextChange={(e) => setProfile(e.htmlValue)}
                style={{ height: "150px" }}
                placeholder="Enter your Speaker Profile here..."
              />
            </div>

            {/* Add more steps as needed */}
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header=" ">
            <div className="table-container">
              <div>
                {/* Dropdown to select Fest or Conference */}
                <div>
                  <label>Select Event Type:</label>
                  <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="fest">Fest</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>

                {/* Conditionally render the table based on the selected option */}
                {selectedOption && (
                  <div>
                    {/* Income Table */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="5" className="table-heading">
                            DETAILS OF INCOME (
                            {selectedOption === "fest" ? "Fest" : "Conference"})
                          </th>
                        </tr>
                        <tr>
                          <th>Sl No</th>
                          <th>Particulars</th>
                          <th>No. Participants</th>
                          <th>Rate</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Participation Fee [{selectedOption}]</td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Sponsorship [{selectedOption}]</td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="total-label">
                            Total Income
                          </td>
                          <td>
                            <input type="text" className="input-field" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Expenses Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th colSpan="3" className="table-heading">
                      DETAILS OF EXPENSES
                    </th>
                  </tr>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Particulars</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                    <td>
                      <input type="text" className="input-field" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Expenditure Table */}
            <table className="table">
              <tbody>
                <tr>
                  <th colSpan="3" className="total-expenditure-label">
                    Total Expenditure
                  </th>
                </tr>
                {/* <tr>
                  <td>
                    <label>Signature of HOD</label>
                    <input type="text" className="input-field" />
                  </td>
                  <td>
                    <label>Finance Office</label>
                    <input type="text" className="input-field" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="office-use-label">
                    Office use only
                  </td>
                </tr> */}
                <div className="mb-3">
                  <label className="form-label">REMARKS</label>
                  <Editor
                    value={Profile}
                    onTextChange={(e) => setProfile(e.htmlValue)}
                    style={{ height: "150px" }}
                    placeholder="Enter your Remarks here..."
                  />
                </div>
                {/* <tr>
          <td colSpan="2">
            <label>Approved By:</label>
            <input
              type="text"
              className="input-field"
              disabled={!isApproved} // Input is disabled until approved
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            {/* Example approval button, replace with actual logic */}
            {/* <button onClick={handleApproval}>Approve</button>
          </td>
        </tr> */}
              </tbody>
            </table> 

            {/* Signature Section */}
            {/* <div className="signature-section">
              <div className="signature-box">
                <p>IQAC Coordinator</p>
                <p>Sign</p>
              </div>
              <div className="signature-box">
                <p>Head of Department</p>
                <p>Sign</p>
              </div>
            </div> */}
            {/* Add more steps as needed */}
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Submit"
                iconPos="right"
                onClick={handleSubmit}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default EventProposal;
