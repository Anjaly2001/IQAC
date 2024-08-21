import React from 'react';
import AdminDashboard from './AdminDashboard';
import BarChart from './BarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import DemoGraph from './DemoGraph';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Dashboard() {
  const events = [
    { id: 1, name: 'Event 1', department: 'Data Science', location: 'Pune' },
    { id: 2, name: 'Event 2', department: 'Commerce', location: 'Bangalore' },
    { id: 3, name: 'Event 3', department: 'BBA', location: 'Delhi' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 p-0 mt-5">
          <AdminDashboard />
        </div>

        {/* First Column: Three Separate Boxes */}
        <div className="col-md-2 mt-7 d-flex flex-column">
          <div className="bg-light p-3 mb-3 text-center border flex-fill">
            <p>Sample Text</p>
            <p>Count: 1</p>
          </div>
          <div className="bg-light p-3 mb-3 text-center border flex-fill">
            <p>Sample Text</p>
            <p>Count: 2</p>
          </div>
          <div className="bg-light p-3 text-center border flex-fill">
            <p>Sample Text</p>
            <p>Count: 3</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-8 mt-5 d-flex flex-column">
          <div className="container-fluid flex-fill">
            <h1 className="text-center mb-4"></h1>
            <div className="row h-100">
              {/* Second Column: Bar Chart */}
              <div className="col-md-6 d-flex flex-column">
                <div className="bg-light p-4 mb-4 flex-fill">
                  <div className="card h-50">
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                      <BarChart />
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Column: Demo Graph */}
              <div className="col-md-6 d-flex flex-column">
                <div className="bg-light p-4 mb-4 flex-fill">
                  <div className="card h-50">
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                      <DemoGraph />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Event Table Spanning Two Columns */}
              <div className="col-md-12">
                <div className="bg-light p-4 text-center mt-4">
                  <h5>Event Table</h5>
                  <DataTable value={events} responsiveLayout="scroll">
                    <Column field="name" header="Event Name" />
                    <Column field="department" header="Department" />
                    <Column field="location" header="Location" />
                  </DataTable>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
