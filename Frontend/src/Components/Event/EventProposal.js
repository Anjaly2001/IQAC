import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EventProposal.css"; // External CSS file for styling
import Sidebar from "../../Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "primereact/editor";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const [Remarks, setRemarks] = useState("");
  const [incomeRows, setIncomeRows] = useState([
    { particulars: "", amount: "" },
  ]);
  const [expenseRows, setExpenseRows] = useState([
    { particulars: "", amount: "" },
  ]);

  const navigate = useNavigate();

  // Handle adding a new row for income
  const handleAddIncomeRow = () => {
    setIncomeRows([...incomeRows, { particulars: "", amount: "" }]);
  };
  // Handle adding a new row for expenses
  const handleAddExpenseRow = () => {
    setExpenseRows([...expenseRows, { particulars: "", amount: "" }]);
  };

  // Handle deleting a row
  const handleDeleteRow = (rows, setRows, index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  // Handle input change
  const handleInputChange = (rows, setRows, index, field, value) => {
    const newRows = [...rows];
    if (field === "amount" && isNaN(value)) return; // Prevent letters in the amount field
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = () => {
    stepperRef.current.nextCallback(); // Call nextCallback
    navigate("/proposalstatus"); // Navigate to the desired page
  };

  // State to track the selected option from the dropdown
  const [selectedOption, setSelectedOption] = useState("");

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
                {/* Income Table */}
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="3" className="table-heading">
                        DETAILS OF INCOME
                      </th>
                    </tr>
                    <tr>
                      <th>Sl No</th>
                      <th>Particulars</th>
                      <th>Amount</th>
                      <th>
                        <FontAwesomeIcon
                          icon={faPlus}
                          onClick={handleAddIncomeRow}
                          style={{ cursor: "pointer" }}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeRows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            value={row.particulars}
                            onChange={(e) =>
                              handleInputChange(
                                incomeRows,
                                setIncomeRows,
                                index,
                                "particulars",
                                e.target.value
                              )
                            }
                            className="input-field"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.amount}
                            onChange={(e) =>
                              handleInputChange(
                                incomeRows,
                                setIncomeRows,
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            className="input-field"
                          />
                        </td>
                        <td>
                          {incomeRows.length > 1 && (
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() =>
                                handleDeleteRow(
                                  incomeRows,
                                  setIncomeRows,
                                  index
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="total-label">
                        Total Income
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input-field"
                          readOnly
                          value={incomeRows.reduce(
                            (acc, row) => acc + Number(row.amount || 0),
                            0
                          )}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                    <th>Sl No</th>
                    <th>Particulars</th>
                    <th>Amount</th>
                    <th>
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={handleAddExpenseRow}
                        style={{ cursor: "pointer" }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenseRows.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={row.particulars}
                          onChange={(e) =>
                            handleInputChange(
                              expenseRows,
                              setExpenseRows,
                              index,
                              "particulars",
                              e.target.value
                            )
                          }
                          className="input-field"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.amount}
                          onChange={(e) =>
                            handleInputChange(
                              expenseRows,
                              setExpenseRows,
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                          className="input-field"
                        />
                      </td>
                      <td>
                        {expenseRows.length > 1 && (
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              handleDeleteRow(
                                expenseRows,
                                setExpenseRows,
                                index
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
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
                <div className="mb-3">
                  <label className="form-label">REMARKS</label>
                  <Editor
                    value={Remarks}
                    onTextChange={(e) => setRemarks(e.htmlValue)}
                    style={{ height: "150px" }}
                    placeholder="Enter your Remarks here..."
                  />
                </div>
              </tbody>
            </table>

            {/* Add more steps as needed */}
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button label="Submit" iconPos="right" onClick={handleSubmit} />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default EventProposal;
