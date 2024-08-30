import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { user_register, campus_list, department_list } from '../../axios/api';

const RegisterSingleUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmpId, setUserEmpId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [customDepartment, setCustomDepartment] = useState('');
    const [userCampus, setUserCampus] = useState('');
    const [campuses, setCampuses] = useState([]);
    const [departments, setDepartments] = useState([]);

    const history = useNavigate();

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await campus_list();
                setCampuses(response);
            } catch (error) {
                console.error('Failed to fetch campuses:', error);
                toast.error('Failed to load campus options.');
            }
        };
        fetchCampuses();
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await department_list();
                setDepartments(response);
            } catch (error) {
                console.error('Failed to fetch departments:', error);
                toast.error('Failed to load department options.');
            }
        };
        fetchDepartments();
    }, []);

    const createUser = async () => {
        let isValid = true;

        if (!userName) {
            toast.error('Please enter the user name.');
            isValid = false;
        }
        if (!userEmpId) {
            toast.error('Please enter the employee ID.');
            isValid = false;
        }
        if (!userEmail) {
            toast.error('Please enter the email address.');
            isValid = false;
        }
        if (!userPhoneNumber || userPhoneNumber.length !== 10) {
            toast.error('Please enter a valid 10-digit phone number.');
            isValid = false;
        }
        if (!userCampus) {
            toast.error('Please select a campus.');
            isValid = false;
        }
        if (!userDepartment && userDepartment !== 'Others') {
            toast.error('Please select a department.');
            isValid = false;
        }
        if (userDepartment === 'Others' && !customDepartment) {
            toast.error('Please enter a department name.');
            isValid = false;
        }

        if (!isValid) {
            return;  // Stop execution if the form is not valid
        }

        const department = userDepartment === 'Others' ? customDepartment : userDepartment;

        const newUser = {
            username: userName,
            emp_id: userEmpId,
            email: userEmail,
            ph: userPhoneNumber,
            department: department,
            location: userCampus,
        };

        try {
            const response = await user_register(newUser);
            console.log('User created successfully:', response);
            toast.success('User created successfully!');
            // Reset the form fields
            setUserName('');
            setUserEmpId('');
            setUserEmail('');
            setUserPhoneNumber('');
            setUserDepartment('');
            setCustomDepartment('');
            setUserCampus('');
            // Navigate to the list user page
            history.push('/list-users');
        } catch (error) {
            console.error('Failed to create user:', error);
            // You can show an additional error toast here if needed, but it's not required based on your request.
        }
    };

    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div>
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
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userName">Enter the full name of the user.</Tooltip>}
                                            >
                                                <label htmlFor="userName">Name {renderAsterisk()}</label>
                                            </OverlayTrigger>
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
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userEmpId">Enter the employee ID.</Tooltip>}
                                            >
                                                <label htmlFor="userEmpId">Emp ID {renderAsterisk()}</label>
                                            </OverlayTrigger>
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
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userEmail">Enter the user's email address.</Tooltip>}
                                            >
                                                <label htmlFor="userEmail">Email {renderAsterisk()}</label>
                                            </OverlayTrigger>
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
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userPhoneNumber">Enter the user's phone number.</Tooltip>}
                                            >
                                                <label htmlFor="userPhoneNumber">Phone Number {renderAsterisk()}</label>
                                            </OverlayTrigger>
                                            <div className="input-group">
                                                <span className="input-group-text">+91</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="userPhoneNumber"
                                                    placeholder="Enter 10-digit phone number"
                                                    value={userPhoneNumber}
                                                    onChange={(e) => setUserPhoneNumber(e.target.value)}
                                                    maxLength={10}
                                                    pattern="\d{10}"
                                                    title="Please enter a 10-digit phone number."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userCampus">Select the user's campus location.</Tooltip>}
                                            >
                                                <label htmlFor="userCampus">Campus {renderAsterisk()}</label>
                                            </OverlayTrigger>
                                            <select
                                                id="userCampus"
                                                className="form-select"
                                                value={userCampus}
                                                onChange={(e) => setUserCampus(e.target.value)}
                                            >
                                                <option value="">Choose Campus</option>
                                                {campuses && campuses.length > 0 ? (
                                                    campuses.map(loc => (
                                                        <option key={loc.id} value={loc.id}>
                                                            {loc.campus}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No locations available</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-userDepartment">Select the user's department. If 'Others' is selected, enter the department name manually.</Tooltip>}
                                            >
                                                <label htmlFor="userDepartment">Parent Department {renderAsterisk()}</label>
                                            </OverlayTrigger>
                                            <select
                                                id="userDepartment"
                                                className="form-select"
                                                value={userDepartment}
                                                onChange={(e) => setUserDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                {departments && departments.length > 0 ? (
                                                    departments.map(dept => (
                                                        <option key={dept.id} value={dept.id}>
                                                            {dept.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">No departments available</option>
                                                )}
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    {userDepartment === 'Others' && (
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="customDepartment">Enter Department Name {renderAsterisk()}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="customDepartment"
                                                    placeholder="Enter department name"
                                                    value={customDepartment}
                                                    onChange={(e) => setCustomDepartment(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={createUser}>
                                        Register User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSingleUser;




// import React, { useState, useEffect } from 'react';
// import AdminDashboard from '../Admin/AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { toast } from 'react-toastify';
// import { user_register, campus_list, department_list, check_user_exists } from '../../axios/api';


// const RegisterSingleUser = () => {
//     const [userName, setUserName] = useState('');
//     const [userEmpId, setUserEmpId] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [userPhoneNumber, setUserPhoneNumber] = useState('');
//     const [userDepartment, setUserDepartment] = useState('');
//     const [customDepartment, setCustomDepartment] = useState('');
//     const [userCampus, setUserCampus] = useState('');
//     const [campuses, setCampuses] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [validationError, setValidationError] = useState({}); // Validation errors for each field

//     useEffect(() => {
//         const fetchCampuses = async () => {
//             try {
//                 const response = await campus_list();
//                 setCampuses(response);
//             } catch (error) {
//                 console.error('Failed to fetch campuses:', error);
//                 toast.error('Failed to load campus options.');
//             }
//         };
//         fetchCampuses();
//     }, []);

//     useEffect(() => {
//         const fetchDepartments = async () => {
//             try {
//                 const response = await department_list();
//                 setDepartments(response);
//             } catch (error) {
//                 console.error('Failed to fetch departments:', error);
//                 toast.error('Failed to load department options.');
//             }
//         };
//         fetchDepartments();
//     }, []);

//     const validateField = async (fieldName, value) => {
//         try {
//             const response = await check_user_exists({ [fieldName]: value });
//             if (response.exists) {
//                 setValidationError((prev) => ({
//                     ...prev,
//                     [fieldName]: `${fieldName} already exists.`,
//                 }));
//                 toast.error(`${fieldName} already exists.`);
//             } else {
//                 setValidationError((prev) => ({
//                     ...prev,
//                     [fieldName]: '',
//                 }));
//             }
//         } catch (error) {
//             console.error(`Failed to validate ${fieldName}:`, error);
//         }
//     };

//     const handleBlur = (fieldName, value) => {
//         if (value) {
//             validateField(fieldName, value);
//         }
//     };

//     const createUser = async () => {
//         const department = userDepartment === 'Others' ? customDepartment : userDepartment;

//         // Check if any validation errors exist or any field is empty
//         if (
//             !userName ||
//             !userEmpId ||
//             !userEmail ||
//             !userPhoneNumber ||
//             !department ||
//             !userCampus ||
//             Object.values(validationError).some((error) => error)
//         ) {
//             toast.error('Please fill in all fields correctly.');
//             return;
//         }

//         const newUser = {
//             username: userName,
//             emp_id: userEmpId,
//             email: userEmail,
//             ph: userPhoneNumber,
//             department: department,
//             location: userCampus,
//         };

//         try {
//             const response = await user_register(newUser);
//             console.log('User created successfully:', response);
//             toast.success('User created successfully!');
//             // Reset form
//             setUserName('');
//             setUserEmpId('');
//             setUserEmail('');
//             setUserPhoneNumber('');
//             setUserDepartment('');
//             setCustomDepartment('');
//             setUserCampus('');
//             setValidationError({});
//         } catch (error) {
//             console.error('Failed to create user:', error);
//             toast.error('Failed to create user.');
//         }
//     };

//     return (
//         <div>
//             <AdminDashboard />
//             <div className="container-fluid mt-1">
//                 <div className="row">
//                     <div className="col-md-3 justify-content-center p-0"></div>
//                     <div className="col-md-8 mt-1 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">Register User</div>
//                             <div className="register mt-5">
//                                 <div className="user-actions mb-4">
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <label htmlFor="userName">Name</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userName"
//                                                 placeholder="Name"
//                                                 value={userName}
//                                                 required
//                                                 onChange={(e) => setUserName(e.target.value)}
//                                                 onBlur={() => handleBlur('username', userName)}
//                                             />
//                                             {validationError.username && (
//                                                 <div className="text-danger">{validationError.username}</div>
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userEmpId">Emp ID</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userEmpId"
//                                                 placeholder="Emp ID"
//                                                 value={userEmpId}
//                                                 required
//                                                 onChange={(e) => setUserEmpId(e.target.value)}
//                                                 onBlur={() => handleBlur('emp_id', userEmpId)}
//                                             />
//                                             {validationError.emp_id && (
//                                                 <div className="text-danger">{validationError.emp_id}</div>
//                                             )}
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
//                                                 required
//                                                 onChange={(e) => setUserEmail(e.target.value)}
//                                                 onBlur={() => handleBlur('email', userEmail)}
//                                             />
//                                             {validationError.email && (
//                                                 <div className="text-danger">{validationError.email}</div>
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userPhoneNumber">Phone Number</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="userPhoneNumber"
//                                                 placeholder="Phone Number"
//                                                 value={userPhoneNumber}
//                                                 required
//                                                 onChange={(e) => setUserPhoneNumber(e.target.value)}
//                                                 onBlur={() => handleBlur('ph', userPhoneNumber)}
//                                             />
//                                             {validationError.ph && (
//                                                 <div className="text-danger">{validationError.ph}</div>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-md-6">
//                                             <label htmlFor="userCampus">Campus</label>
//                                             <select
//                                                 id="userCampus"
//                                                 className="form-select"
//                                                 value={userCampus}
//                                                 required
//                                                 onChange={(e) => setUserCampus(e.target.value)}
//                                                 onBlur={() => handleBlur('location', userCampus)}
//                                             >
//                                                 <option value="">Choose Campus</option>
//                                                 {campuses && campuses.length > 0 ? (
//                                                     campuses.map((loc) => (
//                                                         <option key={loc.id} value={loc.id}>
//                                                             {loc.campus}
//                                                         </option>
//                                                     ))
//                                                 ) : (
//                                                     <option value="">No locations available</option>
//                                                 )}
//                                             </select>
//                                             {validationError.location && (
//                                                 <div className="text-danger">{validationError.location}</div>
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label htmlFor="userDepartment">Parent Department</label>
//                                             <select
//                                                 id="userDepartment"
//                                                 className="form-select"
//                                                 value={userDepartment}
//                                                 required
//                                                 onChange={(e) => setUserDepartment(e.target.value)}
//                                                 onBlur={() => handleBlur('department', userDepartment)}
//                                             >
//                                                 <option value="">Select Department</option>
//                                                 {departments && departments.length > 0 ? (
//                                                     departments.map((dept) => (
//                                                         <option key={dept.id} value={dept.id}>
//                                                             {dept.name}
//                                                         </option>
//                                                     ))
//                                                 ) : (
//                                                     <option value="">No departments available</option>
//                                                 )}
//                                             </select>
//                                             {userDepartment === 'Others' && (
//                                                 <input
//                                                     type="text"
//                                                     className="form-control mt-2"
//                                                     placeholder="Enter Department"
//                                                     value={customDepartment}
//                                                     required
//                                                     onChange={(e) => setCustomDepartment(e.target.value)}
//                                                 />
//                                             )}
//                                             {validationError.department && (
//                                                 <div className="text-danger">{validationError.department}</div>
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
