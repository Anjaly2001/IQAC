import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminDashboard from "../Admin/AdminDashboard";
import Sidebar from "../../Sidebar";

const EventTypeList = ({ eventTypes = [], setEventTypes }) => {
    const navigate = useNavigate();

    const handleDelete = (index) => {
        const updatedEventTypes = eventTypes.filter((_, i) => i !== index);
        setEventTypes(updatedEventTypes);
    };

    const handleEdit = (eventType, index) => {
        navigate('/eventtype', { state: { eventType, index } });
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
                            <h3>Event Types</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventTypes.map((event, index) => (
                                        <tr key={index}>
                                            <td>{event.title}</td>
                                            <td dangerouslySetInnerHTML={{ __html: event.description }} />
                                            <td>
                                                <FaEdit
                                                    className="me-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEdit(event, index)}
                                                />
                                                <FaTrash
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventTypeList;
