import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import { toast } from 'react-toastify';
import { event_type_register, update_event_type } from '../../axios/api'; // Import update API
import Sidebar from "../../Sidebar";
import DOMPurify from 'dompurify';

const EventType = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventTypes, setEventTypes] = useState([]); // State to store event types
    const [editMode, setEditMode] = useState(false); // State to determine if it's edit mode
    const [eventTypeId, setEventTypeId] = useState(null); // Store event type ID for update
    const [titleError, setTitleError] = useState('');

    const sanitizedDescription = DOMPurify.sanitize(description);

    const location = useLocation();
    const navigate = useNavigate();

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const validateTitle = (value) => {
        const titleRegex = /^[a-zA-Z\s]+$/; // Adjust regex as needed
        if (!titleRegex.test(value)) {
            setTitleError("Title should contain only alphabets and spaces.");
        } else {
            setTitleError(""); // Clear error if valid
        }
    };
    
    useEffect(() => {
        // Check if there's an eventType in location.state for editing
        if (location.state && location.state.eventType) {
            const eventType = location.state.eventType; // No destructuring here
            setTitle(eventType?.title || ''); // Prefill title
            setDescription(eventType?.description || ''); // Prefill description
            setEventTypeId(eventType?.id || null); // Set the ID for update
            setEditMode(true); // Switch to edit mode
        }
    }, [location.state?.eventType]); // Dependency on `eventType` in `location.state`
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate Title
        validateTitle(title);
        
        // Check if both title and description are provided
        if (!title || !description) {
            toast.warning("Please fill in all the fields.");
            return;
        }
    
        // Check if there are any title errors from validation
        if (titleError) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
    
        const formattedTitle = toTitleCase(title);
        const newEventType = { title: formattedTitle, description: sanitizedDescription }; // Use form values correctly
    
        try {
            if (editMode && eventTypeId) {
                // Update event type if in edit mode
                const response = await update_event_type(eventTypeId, newEventType); // Use update API
                toast.success("Event type updated successfully!");
                console.log(response)
            } else {
                // Create new event type
                const response = await event_type_register(newEventType); 
                setEventTypes([...eventTypes, response.data]);
                toast.success("Event type created successfully!");
            }
    
            // Clear the form and navigate back to the event type list
            setTitle('');
            setDescription('');
            navigate('/eventtypelist');
        } catch (error) {
            console.error('Error submitting event type:', error.response?.data || error.message);
            toast.error('Error submitting event type. Please try again.');
        }
    };
    
    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3 p-6">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <h2>{editMode ? "Update Event Type" : "Create Event Type"}</h2> {/* Conditional title */}
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title{renderAsterisk()}</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className={`form-control ${titleError ? 'is-invalid' : ''}`} // Add 'is-invalid' class if there's an error
                                        value={title}
                                        placeholder="Enter title"
                                        onChange={(e) => {
                                            setTitle(e.target.value); // Update title state
                                            validateTitle(e.target.value); // Validate the input
                                        }}
                                        required
                                    />
                                    {titleError && <div className="invalid-feedback">{titleError}</div>}  {/* Display validation error */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description{renderAsterisk()}</label>
                                    <div className="card">
                                        <Editor
                                            value={description}
                                            onTextChange={(e) => setDescription(e.htmlValue)}
                                            style={{ height: '320px' }}
                                            placeholder="enter description here....."
                                        />
                                    </div>
                                </div>
                                <div className="text-start">
                                    <button type="submit" className="btn btn-primary">
                                        {editMode ? "Update Event Type" : "Create Event Type"} {/* Button label changes */}
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
