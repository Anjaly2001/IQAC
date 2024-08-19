
import React, { useState } from 'react';
import Axios from 'axios';
import AdminDashboard from '../Admin/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { campus_register } from '../../axios/api';

const CreateCampus = () => {
    const [campusName, setCampusName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState('Upload logo');
    const [campuses, setCampuses] = useState([]);

    const token = localStorage.getItem('access_token'); // Assuming token is stored in local storage
    
    const handleCreateCampus = async () => {
        if (campusName && logo) {
            const formData = new FormData();
            formData.append('campus', campusName); // Backend expects "campus"
            formData.append('logo', logo); // Correctly append the file

            try {
                const response = await campus_register(formData)

                if (response && response.exist) {
                    // console.log("Already exist");
                    toast.error('Campus name already exists!');
                }else {
                    const newCampus = response;
                    setCampuses([...campuses, newCampus]);
                    setCampusName('');
                    setLogo(null);
                    setLogoName('Upload logo');
                    toast.success('Campus created successfully!');
                }
            } 
            catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response);
                    // toast.error('Failed to create campus. Please try again.');
                } else {
                    console.error('Error:', error.message);
                    toast.error('An error occurred. Please try again.');
                }
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };
            //     console.log(response.data)
            //     // toast.success('OTP sent to your email!'); 

            //     const newCampus = response.data;

                
            //     setCampuses([...campuses, newCampus]);
            //     setCampusName('');
            //     setLogo([]);
            //     setLogoName('Upload logo');
            // } 
    //         catch (error) {
    //             if (error.response) {
    //                 console.error('Error response data:', error.response.data);
    //             }
    //             else {
    //                 console.error('Error:', error.message);
    //             }
    //         }
    //     }
    // };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        setLogoName(file ? file.name : 'Upload logo');
    };
    return (
        <div>
        <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                Create Campus
                            </div>
                            <div className="register">
                                <div className="campus-actions mb-4">
                                    <div className="mb-3">
                                        <label htmlFor="campusName" className="form-label">Campus Name</label>
                                        <input
                                            type="text"
                                            id="campusName"
                                            className="form-control"
                                            placeholder="Enter Campus Name"
                                            value={campusName}
                                            onChange={(e) => setCampusName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="logo" className="form-label">Logo</label>
                                        <input
                                            type="file"
                                            id="logo"
                                            className="form-control"
                                            style={{ display: 'none' }}
                                            onChange={handleLogoChange}
                                        />
                                        <label htmlFor="logo" className="form-control">
                                            {logoName}
                                        </label>
                                    </div>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={handleCreateCampus}
                                    >
                                        Create
                                    </button>
                                </div>
                                <div>
                                    
                                    {/* <ul>
                                        {campuses.map(campus => (
                                            <li key={campus.id}>
                                                <img src={campus.logo} alt={campus.name} width={50} height={50} />
                                                {campus.name}
                                            </li>
                                        ))}
                                    </ul> */}
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