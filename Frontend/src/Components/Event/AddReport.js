import React, { useState, useRef } from "react";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../Sidebar";

function AddReport() {
  // Defining state variables
  const stepperRef = useRef(null);
  const [description, setDescription] = useState("");
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [numberOfActivities, setNumberOfActivities] = useState(1);
  const [venue, setVenue] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [eventType, setEventType] = useState("");
  //const [proposal, setProposal] = useState(null);
  const [tag, setTag] = useState("");
  const [collaboratorNames, setCollaboratorNames] = useState([
    "John Doe",
    "Jane Smith",
  ]); // Dummy names
  const [activities, setActivities] = useState([
    { title: "", date: "", startTime: "", endTime: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const FileUpload = ({ label, files, setFiles, inputId }) => (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label">
        {label} *
      </label>
      <div className="d-flex flex-wrap">
        {files.length > 0 &&
          files.map((file, index) => (
            <div
              key={index}
              className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-between"
            >
              <span>{file.name}</span>
              <button
                className="btn btn-danger ms-2"
                onClick={() => setFiles([])}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        {files.length === 0 && (
          <div
            className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center"
            onClick={() => handleAddFiles(inputId)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>
      <input
        id={inputId}
        type="file"
        accept=".pdf"
        onChange={(e) => handleFileChanges(e, setFiles)}
        className="d-none"
      />
    </div>
  );

  const [posterFiles, setPosterFiles] = useState([]);
  const [brochureFiles, setBrochureFiles] = useState([]);
  const [reportFiles, setReportFiles] = useState([]);
  const [photographFiles, setPhotographFiles] = useState([]);
  const [registrationListFiles, setRegistrationListFiles] = useState([]);
  const [certificateParticipantsFiles, setCertificateParticipantsFiles] =
    useState([]);
  const [certificateWinnersFiles, setCertificateWinnersFiles] = useState([]);
  const [proposalFiles, setProposalFiles] = useState([]);
  const [budgetFiles, setBudgetFiles] = useState([]);
  const [emailFiles, setEmailFiles] = useState([]);

  const handleFileChanges = (event, setFiles) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFiles([newFile]); // Replace previous file with the new one
    }
  };

  const handleAddFiles = (inputId) => {
    document.getElementById(inputId).click();
  };

  const [form, setForm] = useState({
    department: "",
    eventType: "",
    description: "",
    campus: "",
    eventTitle: "",
    numberOfActivities: "",
    startDate: "",
    endDate: "",
    time: "",
    venue: "",
    academicYear: "",
    eventTypeFocus: "",
    proposal: null,
    collaborators: [{ name: "", department: "", campus: "" }],
    tag: "",
    title: "",
    eventDate: "",
    eventTime: "",
    blogLink: "",
    targetAudience: "",
    externalAgencies: "",
    externalContacts: "",
    organizingCommittee: "",
    studentVolunteers: "",
    attendees: "",
    summary: "",
    outcomes: [""],
    suggestions: null,
  });

  // Handling changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const academicYearOptions = [
    { label: "2023-2024", value: "2023-2024" },
    { label: "2024-2025", value: "2024-2025" },
    // Add more academic years as needed
  ];

  const eventTypeOptions = [
    {
      value: 0,
      label: "Dance",
      selected: true,
    },
    {
      value: 1,
      label: "Music",
      selected: true,
      // disabled: true,
    },
    {
      value: 2,
      label: "Drama",
    },
    {
      value: 3,
      label: "Coding",
    },
    {
      label: "backend",
      options: [
        {
          value: 4,
          label: "Django",
        },
        {
          value: 5,
          label: "Laravel",
          selected: true,
        },
        {
          value: 6,
          label: "Node.js",
        },
      ],
    },
  ];

  const tagOptions = [
    {
      value: 0,
      label: "Dance",
      selected: true,
    },
    {
      value: 1,
      label: "Music",
      selected: true,
      // disabled: true,
    },
    {
      value: 2,
      label: "Drama",
    },
    {
      value: 3,
      label: "Coding",
    },
    {
      label: "backend",
      options: [
        {
          value: 4,
          label: "Django",
        },
        {
          value: 5,
          label: "Laravel",
          selected: true,
        },
        {
          value: 6,
          label: "Node.js",
        },
      ],
    },
  ];
  const handleCollaboratorChange = (index, field, value) => {
    const updatedCollaborators = [...form.collaborators];
    updatedCollaborators[index][field] = value;
    setForm({ ...form, collaborators: updatedCollaborators });
  };

  const addCollaborator = () => {
    setForm({
      ...form,
      collaborators: [
        ...form.collaborators,
        { name: "", department: "", campus: "" },
      ],
    });
  };

  const removeCollaborator = (index) => {
    const updatedCollaborators = form.collaborators.filter(
      (_, i) => i !== index
    );
    setForm({ ...form, collaborators: updatedCollaborators });
  };

  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...form.outcomes];
    newOutcomes[index] = value;
    setForm({ ...form, outcomes: newOutcomes });
  };

  const handleNumberOfActivitiesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfActivities(value);
    const newActivities = [...activities];
    while (newActivities.length < value) {
      newActivities.push({ title: "", date: "", startTime: "", endTime: "" });
    }
    setActivities(newActivities);
  };

  const handleActivitiesChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log(form);
  };
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];

    // Validate if the file is a PDF
    if (newFile && newFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setFiles([...files, newFile]);
    setError(null); // Reset error if the file is valid
  };

  const handleAddFile = () => {
    document.getElementById("fileInput").click();
  };
  const renderAsterisk = () => <span style={{ color: "red" }}>*</span>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-7 mt-1 pt-2 d-flex justify-content-center">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Report Form
              <hr />
            </div>
            <div className="card flex justify-content-center">
              <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
                <StepperPanel header="">
                  <div className="mb-3 row">
                    <div className="col">
                      <label htmlFor="campus" className="form-label">
                        Campus {renderAsterisk()}
                      </label>
                      <select
                        id="campus"
                        className="form-select"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                      >
                        <option value="">Select Campus</option>
                        <option value="Christ University Bangalore Central Campus">
                          Christ University Bangalore Central Campus
                        </option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="department" className="form-label">
                        Department {renderAsterisk()}
                      </label>
                      <select
                        id="department"
                        className="form-select"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="">Select Department</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                  {/* Collaborators section */}
                  <div className="mb-3">
                    <label className="form-label">
                      Collaborators {renderAsterisk()}
                    </label>
                    {form.collaborators.map((collaborator, index) => (
                      <div key={index} className="row mb-2 align-items-center">
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.campus}
                            onChange={(e) =>
                              handleCollaboratorChange(
                                index,
                                "campus",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Campus</option>
                            <option value="Christ University Bangalore">
                              Christ University Bangalore Central Campus
                            </option>
                            <option value="Christ University Lavasa">
                              Christ University Pune Lavasa Off Campus
                            </option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.department}
                            onChange={(e) =>
                              handleCollaboratorChange(
                                index,
                                "department",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Department</option>
                            <option value="Data Science">Data Science</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.name}
                            onChange={(e) =>
                              handleCollaboratorChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Name</option>
                            {collaboratorNames.map((name, idx) => (
                              <option key={idx} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-plus-circle"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={addCollaborator}
                          ></i>
                          {form.collaborators.length > 1 && (
                            <i
                              className="bi bi-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeCollaborator(index)}
                            ></i>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventTitle" className="form-label">
                      Event Title{renderAsterisk()}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      name="eventTitle"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Enter the event title"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Description{renderAsterisk()}
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "200px" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="numberOfActivities" className="form-label">
                      Number of Activities{renderAsterisk()}
                    </label>
                    <InputText
                      id="numberOfActivities"
                      type="number"
                      value={numberOfActivities > 0 ? numberOfActivities : 1} // Ensure only positive numbers
                      onChange={handleNumberOfActivitiesChange}
                      className="w-100"
                      min="1"
                    />
                  </div>

                  {activities.map((activity, index) => (
                    <div key={index} className="mb-3">
                      <label
                        htmlFor={`activityTitle-${index}`}
                        className="form-label"
                      >
                        Activity {index + 1} Title {renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityTitle-${index}`}
                        value={activity.title}
                        onChange={(e) =>
                          handleActivitiesChange(index, "title", e.target.value)
                        }
                        placeholder="Enter activity title"
                        className="w-100"
                      />

                      <label
                        htmlFor={`activityDate-${index}`}
                        className="form-label mt-3"
                      >
                        Date{renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityDate-${index}`}
                        type="date"
                        value={activity.date}
                        onChange={(e) =>
                          handleActivitiesChange(index, "date", e.target.value)
                        }
                        className="w-100"
                      />

                      <div className="row mt-3">
                        <div className="col">
                          <label
                            htmlFor={`startTime-${index}`}
                            className="form-label"
                          >
                            Start Time{renderAsterisk()}
                          </label>
                          <InputText
                            id={`startTime-${index}`}
                            type="time"
                            value={activity.startTime}
                            onChange={(e) =>
                              handleActivitiesChange(
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="w-100"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`endTime-${index}`}
                            className="form-label"
                          >
                            End Time{renderAsterisk()}
                          </label>
                          <InputText
                            id={`endTime-${index}`}
                            type="time"
                            value={activity.endTime}
                            onChange={(e) =>
                              handleActivitiesChange(
                                index,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="w-100"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="venue" className="form-label">
                            Venue{renderAsterisk()}
                          </label>
                          <InputText
                            id="venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="Enter venue"
                            className="w-100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mb-3">
                    <label htmlFor="academicYear" className="form-label">
                      Academic Year{renderAsterisk()}
                    </label>
                    <Dropdown
                      id="academicYear"
                      value={academicYear}
                      options={academicYearOptions}
                      onChange={(e) => setAcademicYear(e.value)}
                      placeholder="Select academic year"
                      className="w-100"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="eventType" className="form-label">
                      Event Type{renderAsterisk()}
                    </label>
                    <MultiSelect
                      id="eventType"
                      value={eventType}
                      options={eventTypeOptions}
                      onChange={(e) => setEventType(e.value)}
                      placeholder="Select event type"
                      className="w-100"
                      filter
                    />
                  </div>

                  <div>
                    <div className="mb-3">
                      <label htmlFor="proposal" className="form-label">
                        Upload Proposal{renderAsterisk()}
                      </label>
                      <div className="d-flex flex-wrap">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="file-box p-3 me-2 mb-2 border border-primary"
                          >
                            <span>{file.name}</span>
                          </div>
                        ))}
                        <div
                          className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center"
                          onClick={handleAddFile}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="d-none"
                      />
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label">
                      Tags{renderAsterisk()}
                    </label>
                    <MultiSelect
                      id="Tags"
                      value={tag}
                      options={tagOptions}
                      onChange={(e) => setTag(e.value)}
                      placeholder="Select Tags"
                      className="w-100"
                      filter
                    />
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

                <StepperPanel header="">
                  <div className="mb-3">
                    <label className="form-label">
                      Blog Link{renderAsterisk()}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="blogLink"
                      value={form.blogLink}
                      onChange={handleChange}
                    />
                  </div>

                  <h3 className="text-center mt-4 mb-3">
                    PARTICIPANTS INFORMATION
                  </h3>
                  <div className="mb-3">
                    <label className="form-label">
                      Target Audience{renderAsterisk()}
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      External Members/ Agencies with Affiliation
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Website/Contact of External Members
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Organizing Committee Details{renderAsterisk()}
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      No of Student Volunteers{renderAsterisk()}
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      No of Attendees/ Participants{renderAsterisk()}
                    </label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: "80px" }}
                    />
                  </div>
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

                <StepperPanel header="">
                  <div>
                    <h3 className="text-center mt-4 mb-3">
                      File uploads of the event
                    </h3>
                    <div>

                      {/* Poster Upload */}
                      <FileUpload
                        label="Upload Poster"
                        files={posterFiles}
                        setFiles={setPosterFiles}
                        inputId="posterFileInput"
                      />

                      {/* Brochure Upload */}
                      <FileUpload
                        label="Upload Brochure"
                        files={brochureFiles}
                        setFiles={setBrochureFiles}
                        inputId="brochureFileInput"
                      />

                      {/* Detailed Report Upload */}
                      <FileUpload
                        label="Upload Detailed Report"
                        files={reportFiles}
                        setFiles={setReportFiles}
                        inputId="reportFileInput"
                      />

                      {/* Photographs of Event Upload */}
                      <FileUpload
                        label="Upload Photographs"
                        files={photographFiles}
                        setFiles={setPhotographFiles}
                        inputId="photographFileInput"
                      />

                      {/* Registration List Upload */}
                      <FileUpload
                        label="Upload Registration List"
                        files={registrationListFiles}
                        setFiles={setRegistrationListFiles}
                        inputId="registrationListInput"
                      />

                      {/* Sample Certificate of Participants Upload */}
                      <FileUpload
                        label="Upload Sample Certificate of Participants"
                        files={certificateParticipantsFiles}
                        setFiles={setCertificateParticipantsFiles}
                        inputId="certificateParticipantsInput"
                      />

                      {/* Sample Certificate of Winners Upload */}
                      <FileUpload
                        label="Upload Sample Certificate of Winners"
                        files={certificateWinnersFiles}
                        setFiles={setCertificateWinnersFiles}
                        inputId="certificateWinnersInput"
                      />

                      {/* Proposal and Planning Document Upload */}
                      <FileUpload
                        label="Upload Proposal and Planning Document"
                        files={proposalFiles}
                        setFiles={setProposalFiles}
                        inputId="proposalFileInput"
                      />

                      {/* Budget Upload */}
                      <FileUpload
                        label="Upload Budget"
                        files={budgetFiles}
                        setFiles={setBudgetFiles}
                        inputId="budgetFileInput"
                      />

                      {/* Print of Email Communication Upload */}
                      <FileUpload
                        label="Upload Print of Email Communication"
                        files={emailFiles}
                        setFiles={setEmailFiles}
                        inputId="emailFileInput"
                      />
                    </div>

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
                  </div>
                </StepperPanel>

                <StepperPanel header="">
                  <div className="mb-3">
                    <label className="form-label">
                      SUMMARY OF THE OVERALL EVENT{renderAsterisk()}
                    </label>
                    <Editor
                      value={summary}
                      onTextChange={(e) => setSummary(e.htmlValue)}
                      style={{ height: "200px" }}
                    />
                  </div>

                  <h3 className="text-center mt-4 mb-3">
                    OUTCOMES OF THE EVENT
                  </h3>
                  {form.outcomes.map((outcome, index) => (
                    <div key={index} className="mb-3">
                      <label className="form-label">
                        Outcome {index + 1}
                        {renderAsterisk()}
                      </label>
                      <Editor
                        value={outcome}
                        onTextChange={(e) =>
                          handleOutcomeChange(index, e.htmlValue)
                        }
                        style={{ height: "200px" }}
                      />
                    </div>
                  ))}

                  <h3 className="text-center mt-4 mb-3">
                    SUGGESTIONS FOR IMPROVEMENT • FEEDBACK FROM IQAC
                  </h3>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="proposal" className="form-label">
                        Upload {renderAsterisk()}
                      </label>
                      <div className="d-flex flex-wrap">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="file-box p-3 me-2 mb-2 border border-primary"
                          >
                            <span>{file.name}</span>
                          </div>
                        ))}
                        <div
                          className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center"
                          onClick={handleAddFile}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="d-none"
                      />
                    </div>
                  </div>

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
                      onClick={() => stepperRef.current.nextCallback()}
                    />
                  </div>
                </StepperPanel>

                <StepperPanel header="">
                  <div className="row">
                    <div className="col-lg-6">
                      <h4 className="text-center mb-4 mt-2">
                        Registered Event Details
                      </h4>

                      <p>
                        <strong>Campus :</strong> {}
                      </p>
                      <p>
                        <strong>Department :</strong> {}
                      </p>
                      <p>
                        <strong>C_Campus :</strong> {}
                      </p>
                      <p>
                        <strong>C_Department :</strong> {}
                      </p>
                      <p>
                        <strong>C_Name :</strong> {}
                      </p>
                      <p>
                        <strong>Event Title :</strong> {}
                      </p>
                      <p>
                        <strong>Description :</strong> {}
                      </p>
                      <p>
                        <strong>NO.Of_Activities :</strong> {}
                      </p>
                      <p>
                        <strong>Title :</strong> {}
                      </p>
                      <p>
                        <strong>Date :</strong> {}
                      </p>
                      <p>
                        <strong>Time :</strong> {}
                      </p>
                      <p>
                        <strong>Venue :</strong> {}
                      </p>
                      <p>
                        <strong>Academic Year :</strong> {}
                      </p>
                      <p>
                        <strong>Event_Type :</strong> {}
                      </p>
                      <p>
                        <strong>proposal :</strong> {}
                      </p>
                      <p>
                        <strong>Tags :</strong> {}
                      </p>
                      <p>
                        <strong>Blog Link :</strong> {}
                      </p>
                      <p>
                        <strong>Target Audience :</strong> {}
                      </p>
                      <p>
                        <strong>External Members :</strong> {}
                      </p>
                      <p>
                        <strong>Organizing Committee :</strong> {}
                      </p>
                      <p>
                        <strong>No.Of_Student_Volunteers :</strong> {}
                      </p>
                      <p>
                        <strong>No.Of_Attendees :</strong> {}
                      </p>
                      <p>
                        <strong>Summary :</strong> {}
                      </p>
                      <p>
                        <strong>Outcome :</strong> {}
                      </p>
                      <p>
                        <strong>feedBack :</strong> {}
                      </p>

                      {/* {[
                                { label: ":", value:1 },
                                { label: ":", value:2 },
                                { label: ":", value:3 },
                                { label: ":", value:4  },
                                { label: ":", value:5  },
                                { label: ":", value:6  },
                                { label: ":", value:7  },
                         
                              ]} */}
                    </div>
                  </div>
                </StepperPanel>
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReport;
