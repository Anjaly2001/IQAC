import React, { useState,  useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown'; // Assuming you use PrimeReact for dropdowns
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from '../Admin/AdminDashboard';
import { campus_name_list, department_list_by_campus} from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRole = () => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [campuses, setCampuses] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState(null); // Mock role, update as necessary
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);


    useEffect(() => {
        const fetchCampuses = async () => {
            const data = await campus_name_list();
            if (data.length > 0) {
                setCampuses(data.map(campus => ({ label: campus.name, value: campus.id })));
            } else {
                setCampuses([]); 
            }
        };
        fetchCampuses();
    }, []);

    useEffect(() => {
        const fetchDepartments = async (campusId) => {
            if (!campusId) return;  // Do not fetch if campusId is not set
            try {
                const response = await department_list_by_campus(campusId);
                setDepartments(response.map(department => ({ label: department.name, value: department.id }))); // Set the departments array correctly
            } catch (error) {
                console.error('Failed to fetch departments:', error);
                toast.error('Failed to load department options.');
            }
        };
        fetchDepartments(selectedCampus);  // Trigger fetching departments when selectedCampus changes
    }, [selectedCampus]);

    const departmentsDropdown = departments.map(department => (
        { label: department.label, value: department.value }
    ));
    


    
    // const campuses = [{ label: 'Central Campus', value: 'Lavasa Campus' }, { label: 'Lav', value: 'campusB' }];
    // const departments = [{ label: 'Department X', value: 'deptX' }, { label: 'Department Y', value: 'deptY' }];
    const users = [{ label: 'User 1', value: 'user1' }, { label: 'User 2', value: 'user2' }];
    const roles = [{ label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }];

    const handleSubmit = () => {
        // Handle the submit action, fetch current role for user
    };

    const handleSave = () => {
        // Save the role assignment
    };

    const handleAddRoleClick = () => {
        setShowAdditionalFields(true);
    };


    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="col-md-2 bg-light p-3">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 p-7">
                    <h1 className="text-center fw-bold fs-5 mb-4">Role Settings</h1>

                    {/* First Row: Campus, Department, User */}
                    <div className="row mt-6">
                        <div className="col-md-4">
                        <label htmlFor="campus" className="form-label">Campus</label>
                            <div className="form-group">
                                <Dropdown
                                    id="selectedCampus"
                                    value={selectedCampus}
                                    options={campuses}
                                    onChange={(e) => setSelectedCampus(e.value)}
                                    placeholder="Select Campus"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="department" className="form-label">Department</label>
                            <div className="form-group">
                                <Dropdown 
                                    id="department" 
                                    value={selectedDepartment} 
                                    options={departmentsDropdown}
                                    onChange={(e) => setSelectedDepartment(e.value)}
                                    placeholder="Select Department"
                                    disabled={!selectedCampus}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="user" className="form-label">User</label>
                            <div className="form-group">
                                <Dropdown id="user" value={selectedUser} options={users}
                                    onChange={(e) => setSelectedUser(e.value)}
                                    placeholder="Select User"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col mt-3">
                        <div className="col-md-12 text-start">
                            <button className="btn btn-primary posi" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>


                    {/* Display current role if it exists */}
                    {currentUserRole && (
                        <div className="mt-3">
                            <h5>Current Role: {currentUserRole}</h5>
                        </div>
                    )}

                    {/* Add Role Button */}
                    <div className="mt-3">
                        <button className="btn btn-success" onClick={handleAddRoleClick}>
                            <FontAwesomeIcon icon={faPlus} /> Add Role
                        </button>
                    </div>

                    {/* Second Row: Role, Campus, Department - Conditionally displayed */}
                    {showAdditionalFields && (
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <label htmlFor="role" className="form-label">Role</label>
                                <div className="form-group">
                                    <Dropdown id="role" value={selectedRole} options={roles}
                                        onChange={(e) => setSelectedRole(e.value)}
                                        placeholder="Select Role"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="campus2" className="form-label">Campus</label>
                                <div className="form-group">
                                    <Dropdown id="campus2" value={selectedCampus} options={campuses}
                                        onChange={(e) => setSelectedCampus(e.value)}
                                        placeholder="Select Campus"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="department2" className="form-label">Department</label>
                                <div className="form-group">
                                    <Dropdown id="department2" value={selectedDepartment} options={departments}
                                        onChange={(e) => setSelectedDepartment(e.value)}
                                        placeholder="Select Department"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    {showAdditionalFields && (
                        <div className="row mt-3">
                            <div className="col-md-12 text-start">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRole;




// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminDashboard from '../Admin/AdminDashboard';
// import { campus_name_list } from '../../axios/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddRole = () => {
//     const [selectedCampus, setSelectedCampus] = useState(null);
//     const [campuses, setCampuses] = useState([]);
//     const [selectedDepartment, setSelectedDepartment] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [selectedRole, setSelectedRole] = useState(null);
//     const [departments, setDepartments] = useState([]); // Added departments state
//     const [users, setUsers] = useState([]); // Added users state
//     const [roles, setRoles] = useState([]); // Added roles state

//     useEffect(() => {
//         const fetchLocations = async () => {
//             try {
//                 const response = await campus_name_list();
//                 if (response && Array.isArray(response.data)) {
//                     setCampuses(response.data);
//                 } else {
//                     console.error('Unexpected response format:', response);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch campuses:', error);
//                 toast.error('Failed to fetch campuses.');
//             }
//         };

//         // Fetch departments, users, and roles as needed
//         const fetchDepartments = async () => {
//             // Replace with API call to fetch departments
//             const deptData = [
//                 { label: 'Department X', value: 'deptX' },
//                 { label: 'Department Y', value: 'deptY' }
//             ];
//             setDepartments(deptData);
//         };

//         const fetchUsers = async () => {
//             // Replace with API call to fetch users
//             const userData = [
//                 { label: 'User 1', value: 'user1' },
//                 { label: 'User 2', value: 'user2' }
//             ];
//             setUsers(userData);
//         };

//         const fetchRoles = async () => {
//             // Replace with API call to fetch roles
//             const roleData = [
//                 { label: 'Admin', value: 'admin' },
//                 { label: 'Editor', value: 'editor' }
//             ];
//             setRoles(roleData);
//         };

//         fetchLocations();
//         fetchDepartments();
//         fetchUsers();
//         fetchRoles();
//     }, []);

//     const handleSave = async () => {
//         if (!selectedCampus || !selectedDepartment || !selectedUser || !selectedRole) {
//             toast.error('Please fill in all fields.');
//             return;
//         }

//         // Prepare data for submission
//         const roleData = {
//             campus: selectedCampus,
//             department: selectedDepartment,
//             user: selectedUser,
//             role: selectedRole,
//         };

//         try {
//             // Submit the data (make a POST request here)
//             // await saveRoleData(roleData); // Assuming you have an API function to save the role data

//             toast.success('Role assignment saved successfully!');
//         } catch (error) {
//             console.error('Error saving role:', error);
//             toast.error('Failed to save role.');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <AdminDashboard />
//             <h3>Add Role</h3>
//             <div className="row mt-4">
//                 <div className="col-md-4">
//                     <label htmlFor="campus" className="form-label">Campus</label>
//                     <select
//                         id="selectedCampus"
//                         className="form-select"
//                         value={selectedCampus}
//                         onChange={(e) => setSelectedCampus(e.target.value)}
//                     >
//                         <option value="">Choose Campus</option>
//                         {campuses.length > 0 ? (
//                             campuses.map((campus) => (
//                                 <option key={campus.id} value={campus.id}>
//                                     {campus.name}
//                                 </option>
//                             ))
//                         ) : (
//                             <option value="">No campuses available</option>
//                         )}
//                     </select>
//                 </div>
//                 <div className="col-md-4">
//                     <label htmlFor="department" className="form-label">Department</label>
//                     <select
//                         id="selectedDepartment"
//                         className="form-select"
//                         value={selectedDepartment}
//                         onChange={(e) => setSelectedDepartment(e.target.value)}
//                     >
//                         <option value="">Choose Department</option>
//                         {departments.map((dept) => (
//                             <option key={dept.value} value={dept.value}>
//                                 {dept.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="col-md-4">
//                     <label htmlFor="user" className="form-label">User</label>
//                     <select
//                         id="selectedUser"
//                         className="form-select"
//                         value={selectedUser}
//                         onChange={(e) => setSelectedUser(e.target.value)}
//                     >
//                         <option value="">Choose User</option>
//                         {users.map((user) => (
//                             <option key={user.value} value={user.value}>
//                                 {user.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className="row mt-4">
//                 <div className="col-md-4">
//                     <label htmlFor="role" className="form-label">Role</label>
//                     <select
//                         id="selectedRole"
//                         className="form-select"
//                         value={selectedRole}
//                         onChange={(e) => setSelectedRole(e.target.value)}
//                     >
//                         <option value="">Choose Role</option>
//                         {roles.map((role) => (
//                             <option key={role.value} value={role.value}>
//                                 {role.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className="mt-4">
//                 <button className="btn btn-primary" onClick={handleSave}>
//                     <FontAwesomeIcon icon={faSave} /> Save
//                 </button>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AddRole;
