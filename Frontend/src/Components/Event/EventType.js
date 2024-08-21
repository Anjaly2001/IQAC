import React, { useState } from "react";
import { Editor } from "primereact/editor";
import AdminDashboard from '../Admin/AdminDashboard';

const EventType = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic for submitting the data will be handled here
        console.log('Title:', title);
        console.log('Description:', description);

        // Uncomment and update the following logic when the backend is ready
        /*
        fetch('/api/create-event-type/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: title, description: description }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        */
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <h2>Create Event Type</h2>
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <div className="card">
                                        <Editor
                                            value={description}
                                            onTextChange={(e) => setDescription(e.htmlValue)}
                                            style={{ height: '320px' }}
                                        />
                                    </div>
                                </div>
                                <div className="text-start">
                                    <button type="submit" className="btn btn-primary">
                                        Create Event Type
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventType;
