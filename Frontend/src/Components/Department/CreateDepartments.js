import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import AdminDashboard from '../Admin/AdminDashboard';
import Axios from 'axios';

const CreateDepartment = ({ onAddDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [customType, setCustomType] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [locations, setLocations] = useState([]);  // State to hold the list of locations
    const [message, setMessage] = useState('');  // State for success or error message
    const [messageType, setMessageType] = useState('');

    // Fetch locations from the backend when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Retrieve the token from local storage

                const response = await Axios.get('http://127.0.0.1:8000/api/authentication/campus_list/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Fetched locations:', response.data);  // Log the response data to verify it
                setLocations(response.data);  // Update the locations state with the fetched data
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                // Handle the error appropriately
            }
        };

        fetchLocations();
    }, []);  // Empty dependency array means this useEffect runs once when the component mounts
   
    const handleCreateDepartment = async () => {
        const finalType = type === 'Others' ? customType : type;
        const finalLocation = location === 'Others' ? customLocation : location;
    
        if (departmentName && description && finalType && finalLocation) {
            const newDepartment = {
                name: departmentName,
                type: finalType,
                location: finalLocation,
                description  // Ensure description is included
            };
    
            try {
                const token = localStorage.getItem('access_token'); // Retrieve token from local storage
    
                console.log('Posting department data:', newDepartment); // Log data being sent
    
                const response = await Axios.post(
                    'http://127.0.0.1:8000/api/authentication/department_register/',
                    newDepartment,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
    
                console.log('Created department response:', response.data); // Debugging line
    
                onAddDepartment(response.data); // Pass the response data back to the parent component
    
                // Clear form fields after successful submission
                setDepartmentName('');
                setDescription('');
                setType('');
                setLocation('');
                setCustomType('');
                setCustomLocation('');
            } catch (error) {
                console.error('Failed to create department:', error);
                // Handle the error appropriately
            }
        }
    };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3" style={{ maxWidth: '800px' }}>
                        <div className="text-center fw-bold fs-5 mb-4">
                            Create Department
                        </div>
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="departmentName">Department Name</label>
                                <InputText
                                    id="departmentName"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    placeholder="Enter department name"
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description</label>
                                <Editor
                                    id="description"
                                    value={description}
                                    onTextChange={(e) => setDescription(e.htmlValue)}
                                    style={{ height: '320px' }}
                                    placeholder="Enter description here..."
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="type">Type</label>
                                <select
                                    id="type"
                                    className="form-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Choose Type</option>
                                    <option value="Department">Department</option>
                                    <option value="Club">Club</option>
                                    <option value="Center">Center</option>
                                    <option value="Office">Office</option>
                                    <option value="Cell">Cell</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {type === 'Others' && (
                                <div className="p-field w-100 mb-3">
                                    <label htmlFor="customType">Enter Custom Type</label>
                                    <InputText
                                        id="customType"
                                        value={customType}
                                        onChange={(e) => setCustomType(e.target.value)}
                                        placeholder="Enter custom type"
                                        className="w-100"
                                    />
                                </div>
                            )}
                            
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="location">Location</label>
                                <select
                                    id="location"
                                    className="form-select"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Choose Location</option>
                                    {locations.length > 0 ? (
                                        locations.map(loc => (
                                            <option key={loc.id} value={loc.id}>
                                                {loc.campus}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No locations available</option>
                                    )}
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            {location === 'Others' && (
                                <div className="p-field w-100 mb-3">
                                <label htmlFor="customLocation">Enter Custom Location</label>
                                <InputText
                                    id="customLocation"
                                    value={customLocation}
                                    onChange={(e) => setCustomLocation(e.target.value)}
                                    placeholder="Enter custom location"
                                    className="w-100"
                                />
                            </div>
                            )}

                            <div className="p-field w-100">
                                <Button label="Create Department" icon="pi pi-check" onClick={handleCreateDepartment} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartment;
