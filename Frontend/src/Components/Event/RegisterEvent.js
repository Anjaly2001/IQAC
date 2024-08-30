import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import EventSummary from './EventSummary'; // Import the EventSummary component
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import AdminDashboard from '../Admin/AdminDashboard';

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
  const [eventTypeFocus, setEventTypeFocus] = useState('');
  const [proposal, setProposal] = useState(null);
  const [collaborators, setCollaborators] = useState([{ name: '', department: '', campus: '' }]);
  const [tag, setTag] = useState('');
  const [submitted, setSubmitted] = useState(false); // New state to check if form is submitted
  const navigate = useNavigate(); // Initialize useNavigate

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
      eventTypeFocus,
      proposal,
      collaborators,
      tag,
    };
    setSubmitted(true); // Mark form as submitted
    navigate('/eventsummary', { state: { formData } }); // Navigate to summary page
  };

  if (submitted) {
    return <EventSummary formData={{ department, eventType, description, campus, eventTitle, activities, startDate, endDate, startTime, endTime, venue, academicYear, eventTypeFocus, proposal, collaborators, tag }} />;
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
    { label: 'Seminar', value: 'Seminar' },
    { label: 'Workshop', value: 'Workshop' },
    { label: 'Conference', value: 'Conference' },
    // Add more event types as needed
  ];



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <AdminDashboard />
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
                    <option value="Christ University Bangalore Bannerghatta Road Campus">Christ University Bangalore Bannerghatta Road Campus</option>
                    <option value="Christ University Bangalore Kengeri Campus">Christ University Bangalore Kengeri Campus</option>
                    <option value="Christ University Bangalore Yeshwanthpur Campus">Christ University Bangalore Yeshwanthpur Campus</option>
                    <option value="Christ University Delhi NCR Off Campus">Christ University Delhi NCR Off Campus</option>
                    <option value="Christ University Pune Lavasa Off Campus">Christ University Pune Lavasa Off Campus</option>
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
                    <option value="Law">Law</option>
                    <option value="BBA">BBA</option>
                    <option value="MBA">MBA</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Language">Language</option>
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
                        <option value="Christ University Bangalore Bannerghatta Road Campus">Christ University Bangalore Bannerghatta Road Campus</option>
                        <option value="Christ University Bangalore Kengeri Campus">Christ University Bangalore Kengeri Campus</option>
                        <option value="Christ University Bangalore Yeshwanthpur Campus">Christ University Bangalore Yeshwanthpur Campus</option>
                        <option value="Christ University Delhi NCR Off Campus">Christ University Delhi NCR Off Campus</option>
                        <option value="Christ University Pune Lavasa Off Campus">Christ University Pune Lavasa Off Campus</option>
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
                        <option value="">BSc (Data Science/Honours/Honours with Research)</option>
                        <option value="">BSc (Economics and Analytics/Honours/Honours with Research)</option>
                        <option value="">Bachelor of Computer Applications (BCA/Honours/Honours with research)</option>
                        <option value="">LLM (Corporate & Commercial Law)</option>
                        <option value="">LLM (Constitutional & Administrative Law)</option>
                        <option value="">BBA LLB (Honours)</option>
                        <option value="">BA LLB (Honours)</option>
                        <option value="">MSc (Global Finance & Analytics)</option>
                        <option value="">BCom (Financial Analytics/Honours/Honours with Research)</option>
                        <option value="">BBA (Business Analytics/Honours/Honours with Research)</option>
                        <option value="">BBA (Honours/Honours with Research)</option>
                        <option value="">MA (English with Digital Humanities)</option>
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
                  </div>
                </div>
              ))}

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


              <div className="mb-3">
                <label htmlFor="proposal" className="form-label">Upload Proposal{renderAsterisk()}</label>
                <InputText
                  id="proposal"
                  type="file"
                  onChange={(e) => setProposal(e.target.files[0])}
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag{renderAsterisk()}</label>
                <InputText
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Enter tag"
                  className="w-100"
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
