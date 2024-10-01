import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import { department_register, campus_list, department_update } from '../../axios/api';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../Sidebar';

const CreateDepartment = ({ onAddDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [customType, setCustomType] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [locationMap, setLocationMap] = useState({});
    const [message, setMessage] = useState('');  
    const [messageType, setMessageType] = useState('');
    const [departmentNameError, setDepartmentNameError] = useState('');
    const [locationId, setLocationId] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);

    const navigate = useNavigate();
    const locationState = useLocation().state;

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const validateDepartmentName = (value) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(value)) {
            setDepartmentNameError("Department name should contain only alphabets and spaces.");
        } else {
            setDepartmentNameError("");
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await campus_list();
                if (response && Array.isArray(response)) {
                    setLocations(response);
                    // Create a map of location names to IDs
                    const map = response.reduce((acc, loc) => {
                        acc[loc.campus] = loc.id;
                        return acc;
                    }, {});
                    setLocationMap(map);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                toast.error('Failed to fetch locations.');
            }
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        if (locationState && locationState.department && Object.keys(locationMap).length > 0) {
            const { department } = locationState;
            setDepartmentName(department.name);
            setDescription(department.description);
            setType(department.type);
            
            const locationId = locationMap[department.location] || '';
            setLocationId(locationId);
            setLocation(department.location);
            
            setIsEdit(true);
            setDepartmentId(department.id);
        }
    }, [locationState, locationMap]);  // Ensure both locationState and locationMap are ready
    
    
    const handleCreateOrUpdateDepartment = async () => {
        const finalType = type === 'Others' ? customType : type;
        const finalLocationId = location === 'Others' ? locationMap[customLocation] : locationId;
    
        if (departmentName && description && finalType && finalLocationId) {
            const payload = {
                name: toTitleCase(departmentName),
                type: finalType,
                location_id: finalLocationId || locationMap[location], // Fallback to locationMap[location]
                description: description
            };
            try {
                let response;
                if (isEdit && departmentId) {
                    response = await department_update(departmentId, payload);
                } else {
                    response = await department_register(payload);
                }
    
                if (response && response.exist) {
                    toast.error('Department name already exists!');
                } else {
                    toast.success(isEdit ? 'Department updated successfully!' : 'Department created successfully!');
                    setTimeout(() => {
                        navigate('/listdepartment');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error response:', error.response);
                toast.error('Failed to create/update department. Please try again.');
            }
        } else {
            toast.error('Please fill in all fields.');
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
                    <div className="container mt-3" style={{ maxWidth: '800px' }}>
                        <div className="text-center fw-bold fs-5 mb-4">
                        <h4 className="fw-bold text-center">
                            {isEdit ? 'Edit Department' : 'Create Department'}</h4>
                        </div>
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="departmentName">Department Name{renderAsterisk()}</label>
                                <InputText
                                    id="departmentName"
                                    value={departmentName}
                                    onChange={(e) => {
                                        setDepartmentName(e.target.value);
                                        validateDepartmentName(e.target.value);  
                                    }}
                                    placeholder="Enter department name"
                                    className="w-100"
                                />
                                {departmentNameError && <small style={{ color: 'red' }}>{departmentNameError}</small>}
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description{renderAsterisk()}</label>
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
                                <label htmlFor="type">Type{renderAsterisk()}</label>
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
                            
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="location">Location{renderAsterisk()}</label>
                                <select
                                    id="location"
                                    className="form-select"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                        setLocationId(locationMap[e.target.value] || '');
                                    }}
                                >
                                    <option value="">Choose Location</option>
                                    {locations.length > 0 ? (
                                        locations.map(loc => (
                                            <option key={loc.id} value={loc.campus}>
                                                {loc.campus}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No locations available</option>
                                    )}
                                    {/* <option value="Others">Others</option> */}
                                </select>
                            </div>
                        
                            <Button
                                label={isEdit ? 'Update Department' : 'Create Department'}
                                onClick={handleCreateOrUpdateDepartment}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartment;
