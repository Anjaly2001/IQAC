import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

import { campus_register, campus_update } from '../../axios/api'; // Import the update API function
import Sidebar from '../../Sidebar';

const CreateCampus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [campusName, setCampusName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [campuses, setCampuses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [campusId, setCampusId] = useState(null); // State to hold campus ID when editing

    const token = localStorage.getItem('access_token');

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };


    useEffect(() => {
        if (location.state && location.state.campus) {
            const { campus } = location.state;
            setCampusName(campus.name);
            setLogoName(campus.logo);
            setIsEdit(true);
            setCampusId(campus.id); // Store the campus ID when editing
        }
    }, [location.state]);

    // const isTitleCase = (str) => {
    //     return str === str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    // };

    const handleCreateOrUpdateCampus = async () => {
        // if (!isTitleCase(campusName)) {
        //     toast.error('Campus name must be in title case.');
        //     return;
        // }

        if (campusName && (logo || isEdit)) {
            const formData = new FormData();
            formData.append('campus', toTitleCase(campusName));
            if (logo) formData.append('logo', logo);

            try {
                let response;
                if (isEdit && campusId) {
                    // If in edit mode, call the update API
                    response = await campus_update(campusId, formData);
                } else {
                    // If not in edit mode, call the create API
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

                    // Clear form and reset states
                    setCampusName('');
                    setLogo(null);
                    setLogoName('');
                    setLogoPreview('');
                    setIsEdit(false);
                    setCampusId(null);

                    // Navigate to ListCampus page after a delay
                    setTimeout(() => {
                        navigate('/listCampus');
                    }, 2000);
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response);
                } else {
                    console.error('Error:', error.message);
                    toast.error('An error occurred. Please try again.');
                }
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    const deleteCampus = (campusId) => {
        setCampuses(campuses.filter(campus => campus.id !== campusId));
        console.log('Deleted campus with ID:', campusId);
    };

    const handleLogoChange = (e) => {
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
    };

    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );
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
                                {isEdit ? 'Edit Campus' : 'Create Campus'}
                            </div>
                            <div className="register">
                                <div className="campus-actions mb-4">
                                    <div className="mb-3">
                                        <label htmlFor="campusName" className="form-label">Campus Name{renderAsterisk()}</label>
                                        <input
                                            type="text"
                                            id="campusName"
                                            className="form-control same-width"
                                            placeholder="Enter Campus Name"
                                            value={campusName}
                                            onChange={(e) => setCampusName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="logo" className="form-label">Logo{renderAsterisk()}</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="file"
                                                id="logo"
                                                className="form-control same-width"
                                                onChange={handleLogoChange}
                                            />
                                            <label htmlFor="logo" className="ms-2">
                                                {logoName}
                                            </label>
                                        </div>
                                        {logoPreview && (
                                            <div className="mt-3">
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo Preview"
                                                    style={{ maxWidth: '20%', height: '30%' }}
                                                />
                                            </div>
                                        )}
                                    </div>
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

        </div>
    );
};

export default CreateCampus;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation for accessing passed state
// import Axios from 'axios';
// import AdminDashboard from '../Admin/AdminDashboard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { campus_register } from '../../axios/api';

// const CreateCampus = () => {
//     const location = useLocation(); // Access the location object
//     const [campusName, setCampusName] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [logoName, setLogoName] = useState('');
//     const [campuses, setCampuses] = useState([]);
//     const [isEdit, setIsEdit] = useState(false); // New state to check if editing

//     const token = localStorage.getItem('access_token'); // Assuming token is stored in local storage

//     useEffect(() => {
//         if (location.state && location.state.campus) {
//             const { campus } = location.state;
//             setCampusName(campus.name);
//             setLogoName(campus.logo); // Assuming you have a way to display the logo filename
//             setIsEdit(true); // Set the editing state
//         }
//     }, [location.state]);

//     const handleCreateCampus = async () => {
//         if (campusName && (logo || isEdit)) { // Allow proceeding if editing without changing the logo
//             const formData = new FormData();
//             formData.append('campus', campusName); // Backend expects "campus"
//             if (logo) formData.append('logo', logo); // Only append logo if it's selected

//             try {
//                 const response = await campus_register(formData);

//                 if (response && response.exist) {
//                     toast.error('Campus name already exists!');
//                 } else {
//                     const newCampus = response;
//                     setCampuses([...campuses, newCampus]);
//                     setCampusName('');
//                     setLogo(null);
//                     setLogoName('');
//                     toast.success(isEdit ? 'Campus updated successfully!' : 'Campus created successfully!');
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     console.error('Error response data:', error.response);
//                 } else {
//                     console.error('Error:', error.message);
//                     toast.error('An error occurred. Please try again.');
//                 }
//             }
//         } else {
//             toast.error('Please fill in all fields.');
//         }
//     };

//     const deleteCampus = (campusId) => {
//         setCampuses(campuses.filter(campus => campus.id !== campusId));
//         console.log('Deleted campus with ID:', campusId);
//         // Optionally, add a call to the backend to delete the campus from the database
//     };


//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         setLogo(file);
//         setLogoName(file ? file.name : '');
//     };

//     return (
//         <div>
//             <ToastContainer />
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-4 p-0">
//                         <AdminDashboard />
//                     </div>
//                     <div className="col-md-6 mt-5 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">
//                                 {isEdit ? 'Edit Campus' : 'Create Campus'}
//                             </div>
//                             <div className="register">
//                                 <div className="campus-actions mb-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="campusName" className="form-label">Campus Name</label>
//                                         <input
//                                             type="text"
//                                             id="campusName"
//                                             className="form-control same-width"
//                                             placeholder="Enter Campus Name"
//                                             value={campusName}
//                                             onChange={(e) => setCampusName(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="logo" className="form-label">Logo</label>
//                                         <div className="d-flex align-items-center">
//                                             <input
//                                                 type="file"
//                                                 id="logo"
//                                                 className="form-control same-width"
//                                                 onChange={handleLogoChange}
//                                             />
//                                             <label htmlFor="logo" className="ms-2">
//                                                 {logoName}
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <button
//                                         className="btn btn-primary mt-3"
//                                         onClick={handleCreateCampus}
//                                     >
//                                         {isEdit ? 'Update Campus' : 'Create'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default CreateCampus;
