import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { campus_register, campus_update } from '../../axios/api';
import Sidebar from '../../Sidebar';
import FormField from './FormField';
import FileInput from './FileInput';
//import { FaTimes } from 'react-icons/fa';   

const CreateCampus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [campusName, setCampusName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [campuses, setCampuses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [campusId, setCampusId] = useState(null);
    const [campusNameError, setCampusNameError] = useState('');

    useEffect(() => {
        if (location.state && location.state.campus) {
            const { campus } = location.state;
            setCampusName(campus.name);
            setLogoName(campus.logo);
            setIsEdit(true);
            setCampusId(campus.id);
        }
    }, [location.state]);

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const validateCampusName = (value) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(value)) {
            setCampusNameError("Name should contain only alphabets and spaces.");
        } else {
            setCampusNameError("");
        }
    };

    const handleCreateOrUpdateCampus = async () => {
        if (campusName && (logo || isEdit)) {
            const formData = new FormData();
            formData.append('campus', toTitleCase(campusName));
            if (logo) formData.append('logo', logo);

            try {
                let response;
                if (isEdit && campusId) {
                    response = await campus_update(campusId, formData);
                } else {
                    response = await campus_register(formData);
                }

                if (response && response.exist) {
                    toast.error('Campus name already exists!');
                } else {
                    if (isEdit) {
                        toast.success('Campus updated successfully!');
                    } else {
                        const newCampus = response;
                        setCampuses([...campuses, newCampus]);
                        toast.success('Campus created successfully!');
                    }

                    setCampusName('');
                    setLogo(null);
                    setLogoName('');
                    setLogoPreview('');
                    setIsEdit(false);
                    setCampusId(null);

                    setTimeout(() => {
                        navigate('/listCampus');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error.message);
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 p-0">
                        <Sidebar />
                    </div>
                    <div className="col-md-6 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                            <h4 className="fw-bold text-center">
                                {isEdit ? 'Edit Campus' : 'Create Campus'}</h4>
                            </div>
                            <div className="register">
                                <FormField
                                    id="campusName"
                                    label="Campus Name"
                                    value={campusName}
                                    onChange={(e) => {
                                        setCampusName(e.target.value);
                                        validateCampusName(e.target.value);
                                    }}
                                    error={campusNameError}
                                    placeholder="Enter Campus Name"
                                />
                                <FileInput
                                    id="logo"
                                    label="Logo"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setLogo(file);
                                        setLogoName(file ? file.name : '');
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setLogoPreview(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        } else {
                                            setLogoPreview('');
                                        }
                                    }}
                                    fileName={logoName}
                                    preview={logoPreview}
                                />
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handleCreateOrUpdateCampus}
                                >
                                    {isEdit ? 'Update Campus' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCampus;
