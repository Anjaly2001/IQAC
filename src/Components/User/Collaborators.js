import React, { useState } from 'react';
import './UserDashboard'
import './User.css';


function Collaborators() {
  const [leads, setLeads] = useState(['']);
  const [collaborators, setCollaborators] = useState(['']);

  const handleLeadsChange = (index, value) => {
    const newLeads = [...leads];
    newLeads[index] = value;
    setLeads(newLeads);
  };

  const handleCollaboratorsChange = (index, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index] = value;
    setCollaborators(newCollaborators);
  };

  const addLead = () => {
    setLeads([...leads, '']);
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, '']);
  };

  const removeLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  const removeCollaborator = (index) => {
    setCollaborators(collaborators.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log({ leads, collaborators });
  };

  return (
    <div className="collaborators">
      <h2>Collaborators</h2>
      <form onSubmit={handleSubmit}>
        <h3>Leads</h3>
        {leads.map((lead, index) => (
          <div key={index} className="form-row">
            <input type="text" value={lead} onChange={(e) => handleLeadsChange(index, e.target.value)} />
            <button type="button" onClick={() => removeLead(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addLead}>Add Lead</button>
        <h3>Collaborators</h3>
        {collaborators.map((collaborator, index) => (
          <div key={index} className="orialatorator">
            <input type="text" value={collaborator} onChange={(e) => handleCollaboratorsChange(index, e.target.value)} />
            <button type="button" onClick={() => removeCollaborator(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addCollaborator}>Add Collaborator</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Collaborators;
