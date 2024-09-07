import React from 'react';
import { useLocation } from 'react-router-dom';

const EventSummary = () => {
  const { state } = useLocation(); // Get the passed form data from the location state
  const { formData } = state; // Destructure formData

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Event Summary</h2>
      <div className="mb-3">
        <strong>Campus:</strong> {formData.campus}
      </div>
      <div className="mb-3">
        <strong>Department:</strong> {formData.department}
      </div>
      <div className="mb-3">
        <strong>Event Title:</strong> {formData.eventTitle}
      </div>
      <div className="mb-3">
        <strong>Description:</strong>
        <div dangerouslySetInnerHTML={{ __html: formData.description }} />
      </div>
      <div className="mb-3">
        <strong>Academic Year:</strong> {formData.academicYear}
      </div>
      <div className="mb-3">
  <strong>Event Type:</strong> {Array.isArray(formData.eventType) ? formData.eventType.join(', ') : formData.eventType}
</div>

      <div className="mb-3">
        <strong>Tags:</strong> {formData.tag.join(', ')}
      </div>

      {/* Render Activities */}
      <div className="mb-3">
        <strong>Activities:</strong>
        {formData.activities.map((activity, index) => (
          <div key={index} className="mb-2">
            <p><strong>Title:</strong> {activity.title}</p>
            <p><strong>Date:</strong> {activity.date}</p>
            <p><strong>Start Time:</strong> {activity.startTime}</p>
            <p><strong>End Time:</strong> {activity.endTime}</p>
          </div>
        ))}
      </div>

      {/* Render Collaborators */}
      <div className="mb-3">
        <strong>Collaborators:</strong>
        {formData.collaborators.map((collaborator, index) => (
          <div key={index} className="mb-2">
            <p><strong>Name:</strong> {collaborator.name}</p>
            <p><strong>Department:</strong> {collaborator.department}</p>
            <p><strong>Campus:</strong> {collaborator.campus}</p>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <strong>Venue:</strong> {formData.venue}
      </div>

      <div className="mb-3">
        <strong>Proposal:</strong>
        {formData.proposal ? <span>{formData.proposal.name}</span> : 'No proposal uploaded'}
      </div>
    </div>
  );
};

export default EventSummary;
