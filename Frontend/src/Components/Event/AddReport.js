import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';

function AddReport() {
  // Defining state variables
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
                <label htmlFor="eventTitle" className="form-label">Event Title</label>
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
                <label className="form-label">Description</label>
                <Editor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                  style={{ height: '320px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Number of Activities</label>
                <input
                  type="number"
                  className="form-control"
                  value={numberOfActivities}
                  onChange={handleNumberOfActivitiesChange}
                  min="1"
                  required
                />
              </div>

              {activities.map((activity, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Activity {index + 1}</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Activity Title"
                    value={activity.title}
                    onChange={(e) => handleActivitiesChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={activity.date}
                    onChange={(e) => handleActivitiesChange(index, 'date', e.target.value)}
                  />
                  <div className="row">
                    <div className="col">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Start Time"
                        value={activity.startTime}
                        onChange={(e) => handleActivitiesChange(index, 'startTime', e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="End Time"
                        value={activity.endTime}
                        onChange={(e) => handleActivitiesChange(index, 'endTime', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="venue" className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  id="venue"
                  name="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter the venue"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="academicYear" className="form-label">Academic Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="academicYear"
                  name="academicYear"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="Enter the academic year"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="eventTypeFocus" className="form-label">Event Type Focus</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventTypeFocus"
                  name="eventTypeFocus"
                  value={eventTypeFocus}
                  onChange={(e) => setEventTypeFocus(e.target.value)}
                  placeholder="Enter the event type focus"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Proposal</label>
                <input
                  type="file"
                  className="form-control"
                  id="proposal"
                  name="proposal"
                  onChange={(e) => handleChange(e)}
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tag</label>
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

              {/* Additional Form Fields */}
              <div className="mb-3">
                <label className="form-label">Blog Link:</label>
                <input type="text" className="form-control" name="blogLink" value={form.blogLink} onChange={handleChange} />
              </div>

              <h3 className="text-center mt-4 mb-3">PARTICIPANTS INFORMATION</h3>
              <div className="mb-3">
                <label className="form-label">Target Audience:</label>
                <input type="text" className="form-control" name="targetAudience" value={form.targetAudience} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">External Members/ Agencies with Affiliation:</label>
                <input type="text" className="form-control" name="externalAgencies" value={form.externalAgencies} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Website/Contact of External Members:</label>
                <input type="text" className="form-control" name="externalContacts" value={form.externalContacts} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Organizing Committee Details:</label>
                <input type="text" className="form-control" name="organizingCommittee" value={form.organizingCommittee} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">No of Student Volunteers:</label>
                <input type="number" className="form-control" name="studentVolunteers" value={form.studentVolunteers} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">No of Attendees/ Participants:</label>
                <input type="number" className="form-control" name="attendees" value={form.attendees} onChange={handleChange} />
              </div>


              <div className="mb-3">
                <label className="form-label">SUMMARY OF THE OVERALL EVENT</label>
                <Editor
                  value={summary}
                  onTextChange={(e) => setSummary(e.htmlValue)}
                  style={{ height: '320px' }}
                />
              </div>



             

              <h3 className="text-center mt-4 mb-3">OUTCOMES OF THE EVENT</h3>
              {form.outcomes.map((outcome, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Outcome {index + 1}:</label>
                  <textarea
                    className="form-control"
                    name={`outcome${index}`}
                    value={outcome}
                    onChange={(e) => handleOutcomeChange(index, e.target.value)}
                    maxLength="500"
                  />
                </div>
              ))}

              <h3 className="text-center mt-4 mb-3">SUGGESTIONS FOR IMPROVEMENT • FEEDBACK FROM IQAC</h3>
              <div className="mb-3">
                <label className="form-label">Upload File (PDF):</label>
                <input type="file" className="form-control" accept=".pdf" name="suggestions" onChange={handleChange} />
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

export default AddReport;
