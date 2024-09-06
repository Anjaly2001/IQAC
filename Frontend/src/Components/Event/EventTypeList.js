import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminDashboard from '../Admin/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {event_type_list, event_type_delete} from '../../axios/api';

export default function EventTypeList() {
    const [eventTypes, setEventTypes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        const fetchEventTypeList = async () => {
            try {
                const response = await event_type_list();
    
                const eventTypeData = response.map(eventType => ({
                    id: eventType.id,
                    title: eventType.title,
                    description: eventType.description // Corrected the typo here
                }));
    
                setEventTypes(eventTypeData);
            } catch (error) {
                console.error('Error fetching event types:', error); // Updated error message
            }
        };
    
        fetchEventTypeList();
    }, []);
    
    const handleSearchChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    const handleDeleteEventType = async (id) => {
        // const token = localStorage.getItem('access_token');
        try {
            const response = await event_type_delete(id);
            setEventTypes(eventTypes.filter(eventType => eventType.id !== id));
            console.log(response)
        
            toast.success('Event type deleted successfully!');
        } catch (error) {
            console.error('Error deleting event type:', error);
            console.log(error)
            toast.error('Error deleting event type.');
        }
    };
    
    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <button className="btn btn-link">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn btn-link text-danger" onClick={() => handleDeleteEventType(rowData.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        );
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3 p-5">
                        <div className="d-flex justify-content-center mb-4">
                            <h4 className="fw-bold text-center">Event Types List</h4>
                        </div>
                        <div className="d-flex justify-content-end mb-4">
                            <div className="input-group" style={{ width: '300px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search event types"
                                    value={globalFilter}
                                    onChange={handleSearchChange}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <DataTable 
                                value={eventTypes}
                                paginator 
                                rows={10} 
                                dataKey="id" 
                                globalFilter={globalFilter}
                                emptyMessage="No event types found."
                            >
                                {/* <Column field="eventTypeName" header="Event Type Name" sortable /> */}
                                <Column field="title" header="Event Type Name" sortable />
                                <Column field="description" header="Description" sortable />
                                <Column header="Actions" body={actionBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
