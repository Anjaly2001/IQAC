import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import AdminDashboard from '../Admin/AdminDashboard';

const CreateDepartment = ({ onAddDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [customType, setCustomType] = useState('');
    const [customLocation, setCustomLocation] = useState('');

    const handleCreateDepartment = () => {
        const finalType = type === 'Others' ? customType : type;
        const finalLocation = location === 'Others' ? customLocation : location;

        if (departmentName && description && finalType && finalLocation) {
            const newDepartment = { 
                id: Date.now(), 
                name: departmentName, 
                description, 
                type: finalType, 
                location: finalLocation 
            };
            onAddDepartment(newDepartment);
            setDepartmentName('');
            setDescription('');
            setType('');
            setLocation('');
            setCustomType('');
            setCustomLocation('');
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
                                    <option value="Christ University Bangalore Central Campus">Christ University Bangalore Central Campus</option>
                                    <option value="Christ University Bangalore Bannerghatta Road Campus">Christ University Bangalore Bannerghatta Road Campus</option>
                                    <option value="Christ University Bangalore Kengeri Campus">Christ University Bangalore Kengeri Campus</option>
                                    <option value="Christ University Bangalore Yeshwanthpur Campus">Christ University Bangalore Yeshwanthpur Campus</option>
                                    <option value="Christ University Delhi NCR Off Campus">Christ University Delhi NCR Off Campus</option>
                                    <option value="Christ University Pune Lavasa Off Campus">Christ University Pune Lavasa Off Campus</option>
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
