import React, { useState } from 'react';
import './UserDashboard'
import './User.css';

function EventReport() {
  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log(form);
  };

  return (
    <div className="event-report">
      <h2>Event Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title:</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Event Date:</label>
          <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Event Time:</label>
          <input type="time" name="eventTime" value={form.eventTime} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Blog Link:</label>
          <input type="text" name="blogLink" value={form.blogLink} onChange={handleChange} />
        </div>
        <h3 className="center">PARTICIPANTS INFORMATION</h3>
        <div className="form-row">
          <label>Target Audience:</label>
          <input type="text" name="targetAudience" value={form.targetAudience} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>External Members/ Agencies with Affiliation:</label>
          <input type="text" name="externalAgencies" value={form.externalAgencies} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Website/Contact of External Members:</label>
          <input type="text" name="externalContacts" value={form.externalContacts} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Organizing Committee Details:</label>
          <input type="text" name="organizingCommittee" value={form.organizingCommittee} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>No of Student Volunteers:</label>
          <input type="number" name="studentVolunteers" value={form.studentVolunteers} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>No of Attendees/ Participants:</label>
          <input type="number" name="attendees" value={form.attendees} onChange={handleChange} />
        </div>
        <h3 className="center">SUMMARY OF THE OVERALL EVENT</h3>
        <div className="form-row">
          <textarea name="summary" value={form.summary} onChange={handleChange} minLength="500" />
        </div>
        <h3 className="center">OUTCOMES OF THE EVENT</h3>
        {form.outcomes.map((outcome, index) => (
          <div key={index} className="form-row">
            <label>Outcome {index + 1}:</label>
            <textarea name={`outcome${index}`} value={outcome} onChange={(e) => {
              const newOutcomes = [...form.outcomes];
              newOutcomes[index] = e.target.value;
              setForm({ ...form, outcomes: newOutcomes });
            }} maxLength="500" />
          </div>
        ))}
        <h3 className="center">SUGGESTIONS FOR IMPROVEMENT • FEEDBACK FROM IQAC</h3>
        <div className="form-row">
          <label>Upload File (PDF):</label>
          <input type="file" accept=".pdf" name="suggestions" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventReport;
