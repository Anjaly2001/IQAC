import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';

function AddReport() {
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

  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...form.outcomes];
    newOutcomes[index] = value;
    setForm({ ...form, outcomes: newOutcomes });
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
        <div className="col-9 mt-1 pt-2">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Report Form
              <hr />
            </div>
            <form onSubmit={handleSubmit}>
              {/* Event Fields */}
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="department" className="form-label">Department</label>
                  <select
                    id="department"
                    className="form-select"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
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
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="campus" className="form-label">Campus</label>
                <select
                  id="campus"
                  className="form-select"
                  name="campus"
                  value={form.campus}
                  onChange={handleChange}
                >
                  <option value="">Select Campus</option>
                  <option value="">Christ University Bangalore Central Campus</option>
                  <option value="">Christ University Bangalore Bannerghatta Road Campus</option>
                  <option value="">Christ University Bangalore Kengeri Campus</option>
                  <option value="">Christ University Bangalore Yeshwanthpur Campus</option>
                  <option value="">Christ University Delhi NCR Off Campus</option>
                  <option value="">Christ University Pune Lavasa Off Campus</option>
                  <option value="">Others</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="eventTitle" className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventTitle"
                  name="eventTitle"
                  value={form.eventTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numberOfActivities" className="form-label">Number of Activities (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfActivities"
                  name="numberOfActivities"
                  value={form.numberOfActivities}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="venue" className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  id="venue"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="academicYear" className="form-label">Academic Year</label>
                <select
                  id="academicYear"
                  className="form-select"
                  name="academicYear"
                  value={form.academicYear}
                  onChange={handleChange}
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
                  name="eventTypeFocus"
                  value={form.eventTypeFocus}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="proposal" className="form-label">Proposal (PDF)</label>
                <input
                  type="file"
                  className="form-control"
                  id="proposal"
                  name="proposal"
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Collaborators</label>
                {form.collaborators.map((collaborator, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col">
                      <select
                        className="form-select"
                        name={`collaboratorCampus${index}`}
                        value={collaborator.campus}
                        onChange={(e) => handleCollaboratorChange(index, 'campus', e.target.value)}
                      >
                        <option value="">Select Campus</option>
                        <option value="">Christ University Bangalore Central Campus</option>
                        <option value="">Christ University Bangalore Bannerghatta Road Campus</option>
                        <option value="">Christ University Bangalore Kengeri Campus</option>
                        <option value="">Christ University Bangalore Yeshwanthpur Campus</option>
                        <option value="">Christ University Delhi NCR Off Campus</option>
                        <option value="">Christ University Pune Lavasa Off Campus</option>
                        <option value="">Others</option>
                      </select>
                    </div>
                    <div className="col">
                      <select
                        className="form-select"
                        name={`collaboratorDepartment${index}`}
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Collaborator Name"
                        name={`collaboratorName${index}`}
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
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                />
              </div>

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
              <h3 className="text-center mt-4 mb-3">SUMMARY OF THE OVERALL EVENT</h3>
              <div className="mb-3">
                <textarea className="form-control" name="summary" value={form.summary} onChange={handleChange} minLength="500" />
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

              <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReport;
