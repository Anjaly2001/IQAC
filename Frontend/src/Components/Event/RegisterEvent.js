import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
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
      // Add more activity slots if the number increases
      const additionalActivities = Array.from({ length: value - activities.length }, () => ({
        title: '',
        date: '',
        startTime: '',
        endTime: ''
      }));
      setActivities([...activities, ...additionalActivities]);
    } else {
      // Trim the activity slots if the number decreases
      setActivities(activities.slice(0, value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      department,
      eventType,
      description,
      campus,
      eventTitle,
      numberOfActivities,
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
    });
  };

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
                  <label htmlFor="campus" className="form-label">Campus</label>
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
                  <label htmlFor="department" className="form-label">Department</label>
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
                        <option value="MBA">MBA</option>
                        <option value="Language">Language</option>
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
                <label htmlFor="eventTitle" className="form-label">Event Title</label>
                <InputText
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <Editor
                  id="description"
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                  style={{ height: '150px' }}
                  placeholder="Enter description here..."
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="numberOfActivities" className="form-label">Number of Activities</label>
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
                  <label htmlFor={`activityTitle-${index}`} className="form-label">Activity {index + 1} Title</label>
                  <InputText
                    id={`activityTitle-${index}`}
                    value={activity.title}
                    onChange={(e) => handleActivitiesChange(index, 'title', e.target.value)}
                    placeholder="Enter activity title"
                    className="w-100"
                  />
                  
                  <label htmlFor={`activityDate-${index}`} className="form-label mt-3">Date</label>
                  <InputText
                    id={`activityDate-${index}`}
                    type="date"
                    value={activity.date}
                    onChange={(e) => handleActivitiesChange(index, 'date', e.target.value)}
                    className="w-100"
                  />
                  
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor={`startTime-${index}`} className="form-label">Start Time</label>
                      <InputText
                        id={`startTime-${index}`}
                        type="time"
                        value={activity.startTime}
                        onChange={(e) => handleActivitiesChange(index, 'startTime', e.target.value)}
                        className="w-100"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor={`endTime-${index}`} className="form-label">End Time</label>
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
                <label htmlFor="venue" className="form-label">Venue</label>
                <InputText
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter venue"
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="academicYear" className="form-label">Academic Year</label>
                <InputText
                  id="academicYear"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="Enter academic year"
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="eventTypeFocus" className="form-label">Event Type Focus</label>
                <InputText
                  id="eventTypeFocus"
                  value={eventTypeFocus}
                  onChange={(e) => setEventTypeFocus(e.target.value)}
                  placeholder="Enter event type focus"
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="proposal" className="form-label">Upload Proposal</label>
                <InputText
                  id="proposal"
                  type="file"
                  onChange={(e) => setProposal(e.target.files[0])}
                  className="w-100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
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
