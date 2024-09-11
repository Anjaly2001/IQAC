import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import EventSummary from './EventSummary'; // Import the EventSummary component
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../Sidebar';

function RegisterEvent() {
  const [department, setDepartment] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [campus, setCampus] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [numberOfActivities, setNumberOfActivities] = useState(1);
  const [activities, setActivities] = useState([{ title: '', date: '', startTime: '', endTime: '' }]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [proposal, setProposal] = useState(null);
  const [collaborators, setCollaborators] = useState([{ name: '', department: '', campus: '' }]);
  const [tag, setTag] = useState('');
  const [submitted, setSubmitted] = useState(false); // New state to check if form is submitted
  const navigate = useNavigate(); // Initialize useNavigate
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const collaboratorNames = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"]; // Example names for dropdown


  const handleCollaboratorChange = (index, field, value) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index][field] = value;
    setCollaborators(updatedCollaborators);
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, { name: '', department: '', campus: '' }]);
  };

  const removeCollaborator = (index) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const handleActivitiesChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  const handleNumberOfActivitiesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfActivities(value);

    if (value > activities.length) {
      const additionalActivities = Array.from({ length: value - activities.length }, () => ({
        title: '',
        date: '',
        startTime: '',
        endTime: ''
      }));
      setActivities([...activities, ...additionalActivities]);
    } else {
      setActivities(activities.slice(0, value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      department,
      eventType,
      description,
      campus,
      eventTitle,
      activities,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      academicYear,
      proposal,
      collaborators,
      tag,
    };
    setSubmitted(true); // Mark form as submitted
    navigate('/eventsummary', { state: { formData } }); // Navigate to summary page
  };

  if (submitted) {
    return <EventSummary formData={{ department, eventType, description, campus, eventTitle, activities, startDate, endDate, startTime, endTime, venue, academicYear, proposal, collaborators, tag }} />;
  }
  const renderAsterisk = () => (
    <span style={{ color: 'red' }}>*</span>
  );

  const academicYearOptions = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
    // Add more academic years as needed
  ];

  const eventTypeOptions = [
    {
      value: 0,
      label: 'Dance',
      selected: true,
    },
    {
      value: 1,
      label: 'Music',
      selected: true,
      // disabled: true,
    },
    {
      value: 2,
      label: 'Drama',
    },
    {
      value: 3,
      label: 'Coding',
    },
    {
      label: 'backend',
      options: [
        {
          value: 4,
          label: 'Django',
        },
        {
          value: 5,
          label: 'Laravel',
          selected: true,
        },
        {
          value: 6,
          label: 'Node.js',
        },
      ],
    },
  ]

  const tagOptions = [
    {
      value: 0,
      label: 'Dance',
      selected: true,
    },
    {
      value: 1,
      label: 'Music',
      selected: true,
      // disabled: true,
    },
    {
      value: 2,
      label: 'Drama',
    },
    {
      value: 3,
      label: 'Coding',
    },
    {
      label: 'backend',
      options: [
        {
          value: 4,
          label: 'Django',
        },
        {
          value: 5,
          label: 'Laravel',
          selected: true,
        },
        {
          value: 6,
          label: 'Node.js',
        },
      ],
    },

  ]

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-7 mt-1 pt-2 d-flex justify-content-center">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Registration Form
              <hr />
            </div>
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor="department" className="form-label">Department{renderAsterisk()}</label>
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

              <div className="mb-3">
                <label className="form-label">Collaborators</label>
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    <div className="col">
                      <select
                        className="form-select"
                        value={collaborator.campus}
                        onChange={(e) => handleCollaboratorChange(index, 'campus', e.target.value)}
                      >
                        <option value="">Select Campus</option>
                        <option value="Christ University Bangalore Central Campus">Christ University Bangalore Central Campus</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="col">
                      <select
                        className="form-select"
                        value={collaborator.department}
                        onChange={(e) => handleCollaboratorChange(index, 'department', e.target.value)}
                      >
                        <option value="">Select Department</option>
                        <option value="">MSc (Data Science)</option>
                        <option value="">Others</option>
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
                      {collaborators.length > 1 && (
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
                <InputText
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description{renderAsterisk()}</label>
                <Editor
                  id="description"
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                  style={{ height: '150px' }}
                  placeholder="Enter description here..."
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEvent;
