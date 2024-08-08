import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
//import AdminDashboard from './Admin/AdminDashboard';

function ParentComponent() {
  const [view, setView] = useState('');

  return (
   
    <div>
      <Sidebar setView={setView} />
      
    </div>
  );
}

export default ParentComponent;
