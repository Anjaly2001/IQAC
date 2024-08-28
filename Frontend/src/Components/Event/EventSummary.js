import React from 'react';

function EventSummary({ formData }) {
  const {
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
  } = formData;

  return (
    <div className="container mt-5">
      <h3>Event Summary</h3>
      <hr />
      <div className="mb-3">
        <strong>Campus:</strong> {campus}
      </div>
      <div className="mb-3">
        <strong>Department:</strong> {department}
      </div>
      <div className="mb-3">
        <strong>Event Title:</strong> {eventTitle}
      </div>
      <div className="mb-3">
        <strong>Description:</strong>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="mb-3">
        <strong>Venue:</strong> {venue}
      </div>
      <div className="mb-3">
        <strong>Academic Year:</strong> {academicYear}
      </div>
      <div className="mb-3">
        <strong>Event Type Focus:</strong> {eventTypeFocus}
      </div>
      <div className="mb-3">
        <strong>Tag:</strong> {tag}
      </div>
      <div className="mb-3">
        <strong>Number of Activities:</strong> {activities.length}
      </div>
      {activities.map((activity, index) => (
        <div key={index} className="mb-3">
          <strong>Activity {index + 1}:</strong>
          <div>Title: {activity.title}</div>
          <div>Date: {activity.date}</div>
          <div>Start Time: {activity.startTime}</div>
          <div>End Time: {activity.endTime}</div>
        </div>
      ))}
      <div className="mb-3">
        <strong>Collaborators:</strong>
        {collaborators.map((collaborator, index) => (
          <div key={index}>
            <div>Name: {collaborator.name}</div>
            <div>Department: {collaborator.department}</div>
            <div>Campus: {collaborator.campus}</div>
          </div>
        ))}
      </div>
      {proposal && (
        <div className="mb-3">
          <strong>Uploaded Proposal:</strong> {proposal.name}
        </div>
      )}
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
}

export default EventSummary;
