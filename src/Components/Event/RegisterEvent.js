import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';

function RegisterEvent() {
  const [department, setDepartment] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [campus, setCampus] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [numberOfActivities, setNumberOfActivities] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [eventTypeFocus, setEventTypeFocus] = useState('');
  const [proposal, setProposal] = useState(null);
  const [collaborators, setCollaborators] = useState([{ name: '', department: '', campus: '' }]);
  const [tag, setTag] = useState('');

  const handleCollaboratorChange = (index, field, value) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index][field] = value;
    setCollaborators(updatedCollaborators);
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, { name: '', department: '', campus: '' }]);
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
      startDate,
      endDate,
      time,
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
            {/* <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#fff' }}> */}
              <div className="text-center fw-bolder fs-5 mt-5">
                Event Registration Form
                <hr />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <div className="col">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select
                      id="department"
                      className="form-select"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="department1">Data Science</option>
                      <option value="department2">MBA</option>
                      <option value="department3">Language</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="campus" className="form-label">Campus</label>
                  <select
                    id="campus"
                    className="form-select"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                  >
                    <option value="">Select Campus</option>
                    <option value="Christ University Lavasa">Christ University Lavasa</option>
                    <option value="Christ University Bangalore">Christ University Bangalore</option>
                    <option value="Christ University Delhi">Christ University Delhi</option>
                    <option value="Christ University Kengeri Campus">Christ University Kengeri Campus</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">Event Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfActivities" className="form-label">Number of Activities (optional)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfActivities"
                    value={numberOfActivities}
                    onChange={(e) => setNumberOfActivities(e.target.value)}
                  />
                </div>
                <div className="mb-3 row">
                  <div className="col">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="venue" className="form-label">Venue</label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="academicYear" className="form-label">Academic Year</label>
                  <select
                    id="academicYear"
                    className="form-select"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 27 }, (_, i) => 2024 + i).map((year) => (
                      <option key={year} value={`${year}-${year + 1}`}>{year}-{year + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="eventTypeFocus" className="form-label">Event Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTypeFocus"
                    value={eventTypeFocus}
                    onChange={(e) => setEventTypeFocus(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="proposal" className="form-label">Proposal (PDF)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="proposal"
                    accept="application/pdf"
                    onChange={(e) => setProposal(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Collaborators</label>
                  {collaborators.map((collaborator, index) => (
                    <div key={index} className="row mb-2">
                      <div className="col">
                        <select
                          className="form-select"
                          value={collaborator.campus}
                          onChange={(e) => handleCollaboratorChange(index, 'campus', e.target.value)}
                        >
                          <option value="">Select Campus</option>
                          <option value="Christ University Lavasa">Christ University Lavasa</option>
                          <option value="Christ University Bangalore">Christ University Bangalore</option>
                          <option value="Christ University Delhi">Christ University Delhi</option>
                          <option value="Christ University Kengeri Campus">Christ University Kengeri Campus</option>
                        </select>
                      </div>
                      <div className="col">
                        <select
                          className="form-select"
                          value={collaborator.department}
                          onChange={(e) => handleCollaboratorChange(index, 'department', e.target.value)}
                        >
                          <option value="">Select Department</option>
                          <option value="department1">Data Science</option>
                          <option value="department2">MBA</option>
                          <option value="department3">Language</option>
                        </select>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Collaborator Name"
                          value={collaborator.name}
                          onChange={(e) => handleCollaboratorChange(index, 'name', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={addCollaborator}>Add Collaborator</button>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default RegisterEvent;
