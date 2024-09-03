import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import AdminDashboard from '../Admin/AdminDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddReport() {
  // Defining state variables
  const stepperRef = useRef(null);
  const [description, setDescription] = useState('');
  const [campus, setCampus] = useState('');
  const [department, setDepartment] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [numberOfActivities, setNumberOfActivities] = useState(1);
  const [venue, setVenue] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [eventTypeFocus, setEventTypeFocus] = useState('');
  const [proposal, setProposal] = useState(null);
  const [tag, setTag] = useState('');
  const [collaboratorNames, setCollaboratorNames] = useState(['John Doe', 'Jane Smith']); // Dummy names
  const [activities, setActivities] = useState([{ title: '', date: '', startTime: '', endTime: '' }]);
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    department: '',
    eventType: '',
    description: '',
    campus: '',
    eventTitle: '',
    numberOfActivities: '',
    startDate: '',
    endDate: '',
    time: '',
    venue: '',
    academicYear: '',
    eventTypeFocus: '',
    proposal: null,
    collaborators: [{ name: '', department: '', campus: '' }],
    tag: '',
    title: '',
    eventDate: '',
    eventTime: '',
    blogLink: '',
    targetAudience: '',
    externalAgencies: '',
    externalContacts: '',
    organizingCommittee: '',
    studentVolunteers: '',
    attendees: '',
    summary: '',
    outcomes: [''],
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
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
    // Add more academic years as needed
  ];

  const eventTypeOptions = [
    { label: 'Seminar', value: 'Seminar' },
    { label: 'Workshop', value: 'Workshop' },
    { label: 'Conference', value: 'Conference' },
    // Add more event types as needed
  ];
  const handleCollaboratorChange = (index, field, value) => {
    const updatedCollaborators = [...form.collaborators];
    updatedCollaborators[index][field] = value;
    setForm({ ...form, collaborators: updatedCollaborators });
  };

  const addCollaborator = () => {
    setForm({
      ...form,
      collaborators: [...form.collaborators, { name: '', department: '', campus: '' }]
    });
  };

  const removeCollaborator = (index) => {
    const updatedCollaborators = form.collaborators.filter((_, i) => i !== index);
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
      newActivities.push({ title: '', date: '', startTime: '', endTime: '' });
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
    document.getElementById('fileInput').click();
  };
  const renderAsterisk = () => (
    <span style={{ color: 'red' }}>*</span>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <AdminDashboard />
        </div>
        <div className="col-7 mt-1 pt-2 d-flex justify-content-center">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Report Form
              <hr />
            </div>
            <div className="card flex justify-content-center">
              <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header="">
                  <div className="mb-3 row">
                    <div className="col">
                      <label htmlFor="campus" className="form-label">Campus {renderAsterisk()}</label>
                      <select
                        id="campus"
                        className="form-select"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                      >
                        <option value="">Select Campus</option>
                        <option value="Christ University Bangalore Central Campus">Christ University Bangalore Central Campus</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="department" className="form-label">Department {renderAsterisk()}</label>
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
                    <label className="form-label">Collaborators {renderAsterisk()}</label>
                    {form.collaborators.map((collaborator, index) => (
                      <div key={index} className="row mb-2 align-items-center">
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.campus}
                            onChange={(e) => handleCollaboratorChange(index, 'campus', e.target.value)}
                          >
                            <option value="">Select Campus</option>
                            <option value="Christ University Bangalore">Christ University Bangalore Central Campus</option>
                            <option value="Christ University Lavasa">Christ University Pune Lavasa Off Campus</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.department}
                            onChange={(e) => handleCollaboratorChange(index, 'department', e.target.value)}
                          >
                            <option value="">Select Department</option>
                            <option value="Data Science">Data Science</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-select"
                            value={collaborator.name}
                            onChange={(e) => handleCollaboratorChange(index, 'name', e.target.value)}
                          >
                            <option value="">Select Name</option>
                            {collaboratorNames.map((name, idx) => (
                              <option key={idx} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-plus-circle"
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            onClick={addCollaborator}
                          ></i>
                          {form.collaborators.length > 1 && (
                            <i
                              className="bi bi-trash"
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeCollaborator(index)}
                            ></i>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventTitle" className="form-label">Event Title{renderAsterisk()}</label>
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
                    <label className="form-label">Description{renderAsterisk()}</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '200px' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="numberOfActivities" className="form-label">Number of Activities{renderAsterisk()}</label>
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
                      <label htmlFor={`activityTitle-${index}`} className="form-label">Activity {index + 1} Title {renderAsterisk()}</label>
                      <InputText
                        id={`activityTitle-${index}`}
                        value={activity.title}
                        onChange={(e) => handleActivitiesChange(index, 'title', e.target.value)}
                        placeholder="Enter activity title"
                        className="w-100"
                      />

                      <label htmlFor={`activityDate-${index}`} className="form-label mt-3">Date{renderAsterisk()}</label>
                      <InputText
                        id={`activityDate-${index}`}
                        type="date"
                        value={activity.date}
                        onChange={(e) => handleActivitiesChange(index, 'date', e.target.value)}
                        className="w-100"
                      />

                      <div className="row mt-3">
                        <div className="col">
                          <label htmlFor={`startTime-${index}`} className="form-label">Start Time{renderAsterisk()}</label>
                          <InputText
                            id={`startTime-${index}`}
                            type="time"
                            value={activity.startTime}
                            onChange={(e) => handleActivitiesChange(index, 'startTime', e.target.value)}
                            className="w-100"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`endTime-${index}`} className="form-label">End Time{renderAsterisk()}</label>
                          <InputText
                            id={`endTime-${index}`}
                            type="time"
                            value={activity.endTime}
                            onChange={(e) => handleActivitiesChange(index, 'endTime', e.target.value)}
                            className="w-100"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="venue" className="form-label">Venue{renderAsterisk()}</label>
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
                    <label htmlFor="academicYear" className="form-label">Academic Year{renderAsterisk()}</label>
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
                    <label htmlFor="eventType" className="form-label">Event Type{renderAsterisk()}</label>
                    <Dropdown
                      id="eventType"
                      value={eventTypeFocus}
                      options={eventTypeOptions}
                      onChange={(e) => setEventTypeFocus(e.value)}
                      placeholder="Select event type"
                      className="w-100"
                    />
                  </div>


                  <div>
                    <div className="mb-3">
                      <label htmlFor="proposal" className="form-label">Upload Proposal{renderAsterisk()}</label>
                      <div className="d-flex flex-wrap">
                        {files.map((file, index) => (
                          <div key={index} className="file-box p-3 me-2 mb-2 border border-primary">
                            <span>{file.name}</span>
                          </div>
                        ))}
                        <div className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center" onClick={handleAddFile}>
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
                    <label className="form-label">Tag{renderAsterisk()}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="Enter a tag"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Blog Link{renderAsterisk()}</label>
                    <input type="text" className="form-control" name="blogLink" value={form.blogLink} onChange={handleChange} />
                  </div>
                  <div className="flex pt-4 justify-content-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                  </div>
                </StepperPanel>


                <StepperPanel header="">

                  <h3 className="text-center mt-4 mb-3">PARTICIPANTS INFORMATION</h3>
                  <div className="mb-3">
                    <label className="form-label">Target Audience{renderAsterisk()}</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">External Members/ Agencies with Affiliation</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Website/Contact of External Members</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Organizing Committee Details{renderAsterisk()}</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">No of Student Volunteers{renderAsterisk()}</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">No of Attendees/ Participants{renderAsterisk()}</label>
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue)}
                      style={{ height: '80px' }}
                    />
                  </div>
                  <div className="flex pt-4 justify-content-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                  </div>
                </StepperPanel>


                <StepperPanel header="">
                  <div className="mb-3">
                    <label className="form-label">SUMMARY OF THE OVERALL EVENT{renderAsterisk()}</label>
                    <Editor
                      value={summary}
                      onTextChange={(e) => setSummary(e.htmlValue)}
                      style={{ height: '200px' }}
                    />
                  </div>

                  <h3 className="text-center mt-4 mb-3">OUTCOMES OF THE EVENT</h3>
                  {form.outcomes.map((outcome, index) => (
                    <div key={index} className="mb-3">
                      <label className="form-label">Outcome {index + 1}{renderAsterisk()}</label>
                      <Editor
                        value={outcome}
                        onTextChange={(e) => handleOutcomeChange(index, e.htmlValue)}
                        style={{ height: '200px' }}
                      />
                    </div>
                  ))}

                  <h3 className="text-center mt-4 mb-3">SUGGESTIONS FOR IMPROVEMENT • FEEDBACK FROM IQAC</h3>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="proposal" className="form-label">Upload {renderAsterisk()}</label>
                      <div className="d-flex flex-wrap">
                        {files.map((file, index) => (
                          <div key={index} className="file-box p-3 me-2 mb-2 border border-primary">
                            <span>{file.name}</span>
                          </div>
                        ))}
                        <div className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center" onClick={handleAddFile}>
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
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Submit" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
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
