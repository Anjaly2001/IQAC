import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';  // Import toast for notifications
import { user_register } from '../../axios/api';

const RegisterSingleUser = () => {
    // State variables to manage the form input values
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userCampus, setUserCampus] = useState('');
    const [customDepartment, setCustomDepartment] = useState('');  // For custom department
    const [customCampus, setCustomCampus] = useState('');  // For custom campus

    // Static campus data (You can replace this with API call if needed)
    const [campus, setCampus] = useState([
        { id: 1, campus: "Main Campus" },
        { id: 2, campus: "North Campus" },
        { id: 3, campus: "South Campus" },
        // Add more campus options here
    ]);

    // Function to handle user creation
    const createUser = async () => {
        let department = userDepartment === 'Others' ? customDepartment : userDepartment;
        let campusSelection = userCampus === 'Others' ? customCampus : userCampus;

        // Ensure all required fields are filled
        if (userName && userEmpId && userEmail && department && campusSelection) {
            const newUser = {
                name: userName,
                emp_id: userEmpId,
                email: userEmail,
                phone_number: userPhoneNumber,
                department,
                campus: campusSelection,
            };

            try {
                // Make the API call to register the user
                const response = await user_register(newUser);
                console.log('Created user response:', response.data);

                toast.success('User created successfully!');
                
                // Reset the form fields after successful user creation
                setUserName('');
                setUserEmpId('');
                setUserEmail('');
                setUserPhoneNumber('');
                setUserDepartment('');
                setUserCampus('');
                setCustomDepartment('');
                setCustomCampus('');
            } catch (error) {
                console.error('Failed to create user:', error);
                toast.error('Failed to create user.');
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    return (
        <div>
            {/* Admin Dashboard component, could include sidebar and other elements */}
            <AdminDashboard />
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-3 justify-content-center p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-8 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">Register User</div>
                            <div className="register mt-5">
                                <div className="user-actions mb-4">
                                    {/* Form for user registration */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userName">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                placeholder="Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userEmpId">Emp ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userEmpId"
                                                placeholder="Emp ID"
                                                value={userEmpId}
                                                onChange={(e) => setUserEmpId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userEmail">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="userEmail"
                                                placeholder="Email"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userPhoneNumber">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userPhoneNumber"
                                                placeholder="Phone Number"
                                                value={userPhoneNumber}
                                                onChange={(e) => setUserPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="userCampus">Campus</label>
                                            <select
                                                id="userCampus"
                                                className="form-select"
                                                value={userCampus}
                                                onChange={(e) => setUserCampus(e.target.value)}
                                            >
                                                <option value="">Choose Campus</option>
                                                {campus.length > 0 ? (
                                                    campus.map(loc => (
                                                        <option key={loc.id} value={loc.id}>
                                                            {loc.campus}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No locations available</option>
                                                )}
                                                <option value="Others">Others</option>
                                            </select>
                                            {userCampus === 'Others' && (
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Enter Campus"
                                                    value={customCampus}
                                                    onChange={(e) => setCustomCampus(e.target.value)}
                                                />
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="userDepartment">Parent Department</label>
                                            <select
                                                className="form-select"
                                                id="userDepartment"
                                                value={userDepartment}
                                                onChange={(e) => setUserDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Law">Law</option>
                                                <option value="BBA">BBA</option>
                                                <option value="MBA">MBA</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="Language">Language</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {userDepartment === 'Others' && (
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Enter Department"
                                                    value={customDepartment}
                                                    onChange={(e) => setCustomDepartment(e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={createUser}
                                    >
                                        Create User
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

export default RegisterSingleUser;
















// import React, { useState } from 'react';
// import AdminDashboard from '../Admin/AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const RegisterSingleUser = () => {
//     // State variables to manage the form input values
//     const [userName, setUserName] = useState('');
//     const [userEmpId, setUserEmpId] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [userPhoneNumber, setUserPhoneNumber] = useState('');
//     const [userDepartment, setUserDepartment] = useState('');
//     const [userCampus, setUserCampus] = useState('');

//     // Function to handle user creation
//     const createUser = () => {
//         let department = userDepartment === 'Others' ? customDepartment : userDepartment;
//         let campus = userCampus === 'Others' ? customCampus : userCampus;

//         if (userName && userEmpId && userEmail && department && campus) {
//             // Logic to handle the creation of the user

//             // Reset the form fields after user creation
//             setUserName('');
//             setUserEmpId('');
//             setUserEmail('');
//             setUserPhoneNumber('');
//             setUserDepartment('');
//             setUserCampus('');
//         }
//     };

// .............................................................................
// import React, { useState } from 'react';
// import axios from 'axios';  // Import axios
// import AdminDashboard from '../Admin/AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { toast } from 'react-toastify';  // Import toast for notifications
// import {user_register} from '../../axios/api';

// const RegisterSingleUser = () => {
//     // State variables to manage the form input values
//     const [userName, setUserName] = useState('');
//     const [userEmpId, setUserEmpId] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [userPhoneNumber, setUserPhoneNumber] = useState('');
//     const [userDepartment, setUserDepartment] = useState('');
//     const [userCampus, setUserCampus] = useState('');
//     const [customDepartment, setCustomDepartment] = useState('');  // For custom department
//     const [customCampus, setCustomCampus] = useState('');  // For custom campus

   

//     // Function to handle user creation
//     const createUser = async () => {
//         let department = userDepartment === 'Others' ? customDepartment : userDepartment;
//         let campus = userCampus === 'Others' ? customCampus : userCampus;

//         // Ensure all required fields are filled
//         if (userName && userEmpId && userEmail && department && campus) {
//             const newUser = {
//                 name: userName,
//                 emp_id: userEmpId,
//                 email: userEmail,
//                 phone_number: userPhoneNumber,
//                 department,
//                 campus,
//             };

//             try {
//                 // Make the API call to register the user
//                 const response = await user_register(newUser);
//                 console.log('Created department response:', response.data);


//                 toast.success('User created successfully!');
                
//                 // Reset the form fields after successful user creation
//                 setUserName('');
//                 setUserEmpId('');
//                 setUserEmail('');
//                 setUserPhoneNumber('');
//                 setUserDepartment('');
//                 setUserCampus('');
//                 setCustomDepartment('');
//                 setCustomCampus('');
//             } catch (error) {
//                 console.error('Failed to create user:', error);
//                 toast.error('Failed to create user.');
//             }
//         } else {
//             toast.error('Please fill in all fields.');
//         }
//     };

//     return (
//         <div>
//             {/* Admin Dashboard component, could include sidebar and other elements */}
//             <AdminDashboard />
//             <div className="container-fluid mt-1">
//                 <div className="row">
//                     <div className="col-md-3 justify-content-center p-0">
//                         {/* Sidebar or other components can go here */}
//                     </div>
//                     <div className="col-md-8 mt-1 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">Register User</div>
//                             <div className="register mt-5">
//                                 <div className="user-actions mb-4">
//                                     {/* Form for user registration */}
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <label htmlFor="userName">Name</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userName"
//                                                 placeholder="Name"
//                                                 value={userName}
//                                                 onChange={(e) => setUserName(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userEmpId">Emp ID</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userEmpId"
//                                                 placeholder="Emp ID"
//                                                 value={userEmpId}
//                                                 onChange={(e) => setUserEmpId(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <label htmlFor="userEmail">Email</label>
//                                             <input
//                                                 type="email"
//                                                 className="form-control"
//                                                 id="userEmail"
//                                                 placeholder="Email"
//                                                 value={userEmail}
//                                                 onChange={(e) => setUserEmail(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userPhoneNumber">Phone Number</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userPhoneNumber"
//                                                 placeholder="Phone Number"
//                                                 value={userPhoneNumber}
//                                                 onChange={(e) => setUserPhoneNumber(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <label htmlFor="userCampus">Campus</label>
//                                             <select
//                                                 id="userCampus"
//                                                 className="form-select"
//                                                 value={userCampus}
//                                                 onChange={(e) => setUserCampus(e.target.value)}
//                                             >
//                                                 <option value="">Choose Campus</option>
//                                                 {campus.length > 0 ? (
//                                                     campus.map(loc => (
//                                                         <option key={loc.id} value={loc.id}>
//                                                             {loc.campus}
//                                                         </option>
//                                                     ))
//                                                 ) : (
//                                                     <option value="">No locations available</option>
//                                                 )}
//                                                 <option value="Others">Others</option>
//                                             </select>
//                                             {userCampus === 'Others' && (
//                                                 <input
//                                                     type="text"
//                                                     className="form-control mt-2"
//                                                     placeholder="Enter Campus"
//                                                     value={customCampus}
//                                                     onChange={(e) => setCustomCampus(e.target.value)}
//                                                 />
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userDepartment">Parent Department</label>
//                                             <select
//                                                 className="form-select"
//                                                 id="userDepartment"
//                                                 value={userDepartment}
//                                                 onChange={(e) => setUserDepartment(e.target.value)}
//                                             >
//                                                 <option value="">Select Department</option>
//                                                 <option value="Data Science">Data Science</option>
//                                                 <option value="Law">Law</option>
//                                                 <option value="BBA">BBA</option>
//                                                 <option value="MBA">MBA</option>
//                                                 <option value="Commerce">Commerce</option>
//                                                 <option value="Language">Language</option>
//                                                 <option value="Others">Others</option>
//                                             </select>
//                                             {userDepartment === 'Others' && (
//                                                 <input
//                                                     type="text"
//                                                     className="form-control mt-2"
//                                                     placeholder="Enter Department"
//                                                     value={customDepartment}
//                                                     onChange={(e) => setCustomDepartment(e.target.value)}
//                                                 />
//                                             )}
//                                         </div>
//                                     </div>
//                                     <button
//                                         className="btn btn-primary mb-3"
//                                         onClick={createUser}
//                                     >
//                                         Create User
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

// export default RegisterSingleUser;
