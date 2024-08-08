import React, { useState } from 'react';
import Header from '../../Header';
import AdminDashboard from '../Admin/AdminDashboard';
import Sidebar from '../../Sidebar';

const Tag = () => {
    const [view, setView] = useState('list'); // 'list' or 'create'

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <Sidebar setView={setView} />
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Tag
                            </div>

                            {view === 'list' ? (
                                <ListTag />
                            ) : (
                                <CreateTag />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ListTag = () => {
    // Implementation for listing campuses
    return <div>List of Tag</div>;
};

const CreateTag = () => {
    const [campusName, setCampusName] = useState('');

    const handleCreate = () => {
        // Logic to create a new campus
    };

    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Campus Name"
                value={campusName}
                onChange={(e) => setCampusName(e.target.value)}
            />
            <button
                className="btn btn-primary mt-2"
                onClick={handleCreate}
            >
                Save
            </button>
        </div>
    );
};

export default Tag;
