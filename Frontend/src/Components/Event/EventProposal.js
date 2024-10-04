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
  const [campus, setCampus] = useState(""); // Holds the selected campus ID
  const [campuses, setCampuses] = useState([]); // Holds the list of campuses
  const [department, setDepartment] = useState(""); // Holds the selected department ID
  const [departments, setDepartments] = useState([]); // Holds the list of departments
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // State for date and time
  const [endDate, setEndDate] = useState(new Date()); // State for date and time
  const [activities, handleActivitiesChange] = useState(1); // State for number of activities
  const renderAsterisk = () => <span style={{ color: "red" }}>*</span>;
  const [description, setDescription] = useState("");
  const stepperRef = useRef(null);
  const [Objective, setObjective] = useState("");
  const [Outcome, setOutcome] = useState("");
  const [Profile, setProfile] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [handleSubmit, sethandleSubmit] = useState("");
  const [incomeRows, setIncomeRows] = useState([
    { particulars: "", amount: "" },
  ]);
  const [expenseRows, setExpenseRows] = useState([
    { particulars: "", amount: "" },
  ]);
  const [incomeErrors, setIncomeErrors] = useState([]); // Track errors for income rows
  const [expenseErrors, setExpenseErrors] = useState([]); // Track errors for expense rows

  // State for dropdown selections
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Sample options for dropdowns (replace with your actual options)
  const campusOptions = ["Campus 1", "Campus 2", "Campus 3"];
  const departmentOptions = ["Department 1", "Department 2", "Department 3"];
  const userOptions = ["User 1", "User 2", "User 3"];

  // Handle dropdown changes
  const handleCampusChange = (e) => setSelectedCampus(e.target.value);
  const handleDepartmentChange = (e) => setSelectedDepartment(e.target.value);
  const handleUserChange = (e) => setSelectedUser(e.target.value);

  // Handle input change for amount field with validation
  const handleInputChange = (index, field, value, tableType) => {
    let updatedRows =
      tableType === "income" ? [...incomeRows] : [...expenseRows];
    let updatedErrors =
      tableType === "income" ? [...incomeErrors] : [...expenseErrors];

    updatedRows[index][field] = value;

    // Validation for amount field (should only accept numbers)
    if (field === "amount" && isNaN(value)) {
      updatedErrors[index] = "Please enter a valid number";
    } else {
      updatedErrors[index] = "";
    }

    if (tableType === "income") {
      setIncomeRows(updatedRows);
      setIncomeErrors(updatedErrors);
    } else {
      setExpenseRows(updatedRows);
      setExpenseErrors(updatedErrors);
    }
  };

  // Handle adding a new row for income or expenses
  const handleAddRow = (tableType) => {
    if (tableType === "income") {
      setIncomeRows([...incomeRows, { particulars: "", amount: "" }]);
      setIncomeErrors([...incomeErrors, ""]);
    } else {
      setExpenseRows([...expenseRows, { particulars: "", amount: "" }]);
      setExpenseErrors([...expenseErrors, ""]);
    }
  };

  // Handle deleting a row
  const handleDeleteRow = (index, tableType) => {
    let updatedRows =
      tableType === "income" ? [...incomeRows] : [...expenseRows];
    let updatedErrors =
      tableType === "income" ? [...incomeErrors] : [...expenseErrors];

    updatedRows.splice(index, 1);
    updatedErrors.splice(index, 1);

    if (tableType === "income") {
      setIncomeRows(updatedRows);
      setIncomeErrors(updatedErrors);
    } else {
      setExpenseRows(updatedRows);
      setExpenseErrors(updatedErrors);
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

              {/* Blue line
              <hr className="blue-line" /> */}

              {/* Event Proposal Title */}
              <h2 className="event-proposal-title mt-6">EVENT PROPOSAL</h2>

              {/* Select campus, department, and user in the same row */}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3 mt-6">

                  {/* Select Campus */}
                  <div className="col-md-4">
                    <label htmlFor="campus" className="form-label">
                      Campus {renderAsterisk()}
                    </label>
                    <select
                      id="campus"
                      className="form-select"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Campus
                      </option>
                      {campuses.map((campus) => (
                        <option key={campus.id} value={campus.id}>
                          {campus.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Department */}
                  <div className="col-md-4">
                    <label htmlFor="department" className="form-label">
                      Department {renderAsterisk()}
                    </label>
                    <select
                      id="department"
                      className="form-select"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      disabled={!campus}
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select User */}
                  <div className="col-md-4">
                    <label htmlFor="user" className="form-label">
                      User {renderAsterisk()}
                    </label>
                    <select
                      id="user"
                      className="form-select"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      disabled={!department}
                    >
                      <option value="" disabled>
                        Select User
                      </option>
                      {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No Users Available</option>
                      )}
                    </select>
                  </div>
                </div>
              </form>

              {/* Table for Event Information */}
              <table className="event-info-table mt-6">
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
                      <th></th> {/* No label for actions column */}
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
                                index,
                                "particulars",
                                e.target.value,
                                "income"
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
                                index,
                                "amount",
                                e.target.value,
                                "income"
                              )
                            }
                            className="input-field"
                          />

                          {/* Error message for amount validation */}
                          {incomeErrors[index] && (
                            <div
                              className="error-message"
                              style={{ color: "red" }}
                            >
                              {incomeErrors[index]}
                            </div>
                          )}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() => handleAddRow("income")}
                          />
                          {incomeRows.length > 1 && (
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDeleteRow(index, "income")}
                              style={{ marginLeft: "10px" }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* Total Income Row */}
                    <tr>
                      <td colSpan="2" className="text-right">
                        <strong>Total Income</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={incomeRows.reduce(
                            (total, row) =>
                              total + (parseFloat(row.amount) || 0),
                            0
                          )}
                          readOnly
                          className="input-field"
                        />
                      </td>
                      <td></td> {/* Empty cell for the actions column */}
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
                    <th></th> {/* No label for actions column */}
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
                              index,
                              "particulars",
                              e.target.value,
                              "expense"
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
                              index,
                              "amount",
                              e.target.value,
                              "expense"
                            )
                          }
                          className="input-field"
                        />

                        {/* Error message for amount validation */}
                        {expenseErrors[index] && (
                          <div
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            {expenseErrors[index]}
                          </div>
                        )}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPlus}
                          onClick={() => handleAddRow("expense")}
                        />
                        {expenseRows.length > 1 && (
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDeleteRow(index, "expense")}
                            style={{ marginLeft: "10px" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Total Expenses Row */}
                  <tr>
                    <td colSpan="2" className="text-right">
                      <strong>Total Expenses</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={expenseRows.reduce(
                          (total, row) => total + (parseFloat(row.amount) || 0),
                          0
                        )}
                        readOnly
                        className="input-field"
                      />
                    </td>
                    <td></td> {/* Empty cell for the actions column */}
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
