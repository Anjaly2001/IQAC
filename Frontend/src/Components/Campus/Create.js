import React, { useState } from 'react';
import Axios from 'axios';
import AdminDashboard from '../Admin/AdminDashboard';

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
                const response = await Axios.post('http://127.0.0.1:8000/api/authentication/campus_register/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}` // Send the token for authentication
                    }
                });

                console.log(response.data)

                const newCampus = response.data;

                
                setCampuses([...campuses, newCampus]);
                setCampusName('');
                setLogo(null);
                setLogoName('Upload logo');
            } catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            }
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        setLogoName(file ? file.name : 'Upload logo');
    };
    return (
        <div>
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
                                    <h5>Campuses List</h5>
                                    <ul>
                                        {campuses.map(campus => (
                                            <li key={campus.id}>
                                                <img src={campus.logo} alt={campus.name} width={50} height={50} />
                                                {campus.name}
                                            </li>
                                        ))}
                                    </ul>
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