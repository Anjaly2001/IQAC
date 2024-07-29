import React, { useState } from 'react';
import './User.css';
import Header from '../Common/Header';
import UserSidebar from './UserSidebar';

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
    <div>
      <Header />
      <div className="row m-auto">
        <div className="col-3">
          <UserSidebar />
        </div>
        <div className="col">
          <div className="event-report">
            <div className="text-center fw-bolder fs-5 mt-3">
              Event Report Form
            </div>
            <div className="event-report">
              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Event Date:</label>
                  <input type="date" className="form-control" name="eventDate" value={form.eventDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Event Time:</label>
                  <input type="time" className="form-control" name="eventTime" value={form.eventTime} onChange={handleChange} />
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
                      onChange={(e) => {
                        const newOutcomes = [...form.outcomes];
                        newOutcomes[index] = e.target.value;
                        setForm({ ...form, outcomes: newOutcomes });
                      }}
                      maxLength="500"
                    />
                  </div>
                ))}
                <h3 className="text-center mt-4 mb-3">SUGGESTIONS FOR IMPROVEMENT • FEEDBACK FROM IQAC</h3>
                <div className="mb-3">
                  <label className="form-label">Upload File (PDF):</label>
                  <input type="file" className="form-control" accept=".pdf" name="suggestions" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventReport;
