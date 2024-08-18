import React from 'react';
import AdminDashboard from './AdminDashboard';
import BarChart from './BarChart'; // Import the new BarChart component
import 'bootstrap/dist/css/bootstrap.min.css';
import DemoGraph from './DemoGraph';

function Dashboard() {
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
            <h1 className="text-center mb-4">Dashboard</h1>
            <div className="row h-100">
              {/* Second Column: Square Cards */}
              <div className="col-md-6 d-flex flex-column">
                <div className="bg-light p-4 mb-4 flex-fill">
                  <div className="card h-100">
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                      <BarChart /> {/* Embed the BarChart component inside Card 1 */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Column */}
              <div className="col-md-6">
                <div className="bg-light p-4 mb-3 text-center" style={{ height: '300px' }}>
                  <DemoGraph /> {/* Embed the graph component */}
                </div>
                <div className="bg-light p-4 text-center" style={{ height: '300px' }}>
                  <p>Reports</p>
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
