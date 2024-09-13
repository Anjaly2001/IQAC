import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import { toast } from 'react-toastify';
import { event_type_register} from '../../axios/api';
import Sidebar from "../../Sidebar";
import DOMPurify from 'dompurify';



const EventType = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventTypes, setEventTypes] = useState([]); // State to store event types
    const [editIndex, setEditIndex] = useState(null);
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
        if (location.state) {
            const { eventType, index } = location.state;
            setTitle(eventType?.title || '');
            setDescription(eventType?.description || '');
            setEditIndex(index);
        }
    }, [location.state]);

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
        const newEventType = { title: formattedTitle, description };
    
        console.log("Submitting event type:", newEventType); // Debugging: Log data
    
        try {
            const response = await event_type_register(newEventType); 
            console.log('Event Type registered:', response.data); // Debugging: Check response
    
            // Update state with the new event type and navigate
            setEventTypes([...eventTypes, response.data]);
            setTitle('');
            setDescription('');
            navigate('/eventtypelist');
        } catch (error) {
            console.error('Error registering event type:', error.response?.data || error.message);
            toast.error('Error registering event type. Please try again.');
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
                            <h2>Create Event Type</h2>
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




// import React, { useState } from "react";
// import { Editor } from "primereact/editor";
// import AdminDashboard from '../Admin/AdminDashboard';

// const EventType = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [eventTypes, setEventTypes] = useState([]); // State to store event types

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const newEventType = { title, description };
//         setEventTypes([...eventTypes, newEventType]); // Add new event type to the list

//         // Reset form fields
//         setTitle('');
//         setDescription('');

//         console.log('Title:', title);
//         console.log('Description:', description);
//     };
//     const renderAsterisk = () => (
//         <span style={{ color: 'red' }}>*</span>
//     );


//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-2 p-0">
//                     <AdminDashboard />
//                 </div>
//                 <div className="col-md-10 mt-5 pt-5">
//                     <div className="container mt-3">
//                         <div className="d-flex flex-column align-items-center mb-4">
//                             <h2>Create Event Type</h2>
//                             <form onSubmit={handleSubmit} className="w-100">
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title{renderAsterisk()}</label>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         className="form-control"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description{renderAsterisk()}</label>
//                                     <div className="card">
//                                         <Editor
//                                             value={description}
//                                             onTextChange={(e) => setDescription(e.htmlValue)}
//                                             style={{ height: '320px' }}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="text-start">
//                                     <button type="submit" className="btn btn-primary">
//                                         Create Event Type
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="mt-5">
//                             <h3>Event Types</h3>
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>Title</th>
//                                         <th>Description</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {eventTypes.map((event, index) => (
//                                         <tr key={index}>
//                                             <td>{event.title}</td>
//                                             <td dangerouslySetInnerHTML={{ __html: event.description }} />
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventType;
