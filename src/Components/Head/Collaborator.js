import React, { useState } from 'react';
import './Head.css';

function Collaborators() {
  const [lead, setLead] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  const handleLeadChange = (e) => {
    setLead(e.target.value);
  };

  const handleCollaboratorsChange = (e) => {
    setCollaborators(Array.from(e.target.selectedOptions, option => option.value));
  };

  const handleSave = () => {
    // Save collaborators logic
    console.log('Lead:', lead, 'Collaborators:', collaborators);
  };

  return (
    <div className="collaborators">
      <h2>Collaborators</h2>
      <label>
        Event Lead:
        <select value={lead} onChange={handleLeadChange}>
          <option value="">Select Lead</option>
          <option value="lead1">Lead 1</option>
          <option value="lead2">Lead 2</option>
        </select>
      </label>
      <label>
        Collaborators:
        <select multiple value={collaborators} onChange={handleCollaboratorsChange}>
          <option value="collaborator1">Collaborator 1</option>
          <option value="collaborator2">Collaborator 2</option>
          <option value="collaborator3">Collaborator 3</option>
        </select>
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Collaborators;
