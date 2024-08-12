// import React, { useState, useEffect } from 'react';
// import Header from '../../Header';
// import AdminDashboard from './AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [userName, setUserName] = useState('');
//     const [userDepartment, setUserDepartment] = useState('');
//     const [editingUser, setEditingUser] = useState(null);
//     const [newUserName, setNewUserName] = useState('');
//     const [newUserDepartment, setNewUserDepartment] = useState('');

//     useEffect(() => {
//         fetchUsers();
//         fetchDepartments();
//     }, []);

//     const fetchUsers = async () => {
//         // Replace this with your API call or mock data
//         const mockUsers = [
//             { id: 1, name: 'Thomas', department: 'HR', status: 'active' },
//             { id: 2, name: 'Shine', department: 'Coordinator', status: 'inactive' },
//         ];
//         setUsers(mockUsers);
//     };

//     const fetchDepartments = async () => {
//         // Replace this with your API call or mock data
//         const mockDepartments = [
//             { id: 1, name: 'HR' },
//             { id: 2, name: 'Engineering' },
//             { id: 3, name: 'Marketing' },
//         ];
//         setDepartments(mockDepartments);
//     };

//     const createUser = () => {
//         if (userName && userDepartment) {
//             const newUser = {
//                 id: users.length + 1,
//                 name: userName,
//                 department: userDepartment,
//                 status: 'active',
//             };
//             setUsers([...users, newUser]);
//             setUserName('');
//             setUserDepartment('');
//         }
//     };

//     const deleteUser = (id) => {
//         setUsers(users.filter(user => user.id !== id));
//     };

//     const startEditing = (user) => {
//         setEditingUser(user);
//         setNewUserName(user.name);
//         setNewUserDepartment(user.department);
//     };

//     const editUser = () => {
//         if (editingUser && newUserName && newUserDepartment) {
//             const updatedUsers = users.map(user =>
//                 user.id === editingUser.id
//                     ? { ...user, name: newUserName, department: newUserDepartment, status: 'inactive' }
//                     : user
//             );
//             setUsers(updatedUsers);
//             setEditingUser(null);
//             setNewUserName('');
//             setNewUserDepartment('');
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-2 p-0">
//                         <AdminDashboard />
//                     </div>
//                     <div className="col-md-10 mt-5 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">
//                                 Register Department for User
//                             </div>

//                             <div className="register">
//                                 <div className="user-actions mb-4">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="User Name"
//                                         value={userName}
//                                         onChange={(e) => setUserName(e.target.value)}
//                                     />
//                                     <select
//                                         className="form-select mt-2"
//                                         value={userDepartment}
//                                         onChange={(e) => setUserDepartment(e.target.value)}
//                                     >
//                                         <option value="">Select Department</option>
//                                         {departments.map(department => (
//                                             <option key={department.id} value={department.name}>{department.name}</option>
//                                         ))}
//                                     </select>
//                                     <button
//                                         className="btn btn-primary mt-2"
//                                         onClick={createUser}
//                                     >
//                                         Create User
//                                     </button>
//                                 </div>

//                                 <div className="user-list">
//                                     {users.map(user => (
//                                         <div key={user.id} className="user-item d-flex justify-content-between align-items-center mb-2">
//                                             {editingUser && editingUser.id === user.id ? (
//                                                 <div className="d-flex flex-column w-100">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         value={newUserName}
//                                                         onChange={(e) => setNewUserName(e.target.value)}
//                                                     />
//                                                     <select
//                                                         className="form-select mt-2"
//                                                         value={newUserDepartment}
//                                                         onChange={(e) => setNewUserDepartment(e.target.value)}
//                                                     >
//                                                         <option value="">Select Department</option>
//                                                         {departments.map(department => (
//                                                             <option key={department.id} value={department.name}>{department.name}</option>
//                                                         ))}
//                                                     </select>
//                                                     <div className="d-flex mt-2">
//                                                         <button className="btn btn-success me-2 btn-sm" onClick={editUser}>Save</button>
//                                                         <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>Cancel</button>
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 <div className="d-flex justify-content-between w-100">
//                                                     <span>{user.name} ({user.department})</span>
//                                                     <span className={user.status === 'active' ? 'badge bg-success' : 'badge bg-secondary'}>
//                                                         {user.status}
//                                                     </span>
//                                                     <div className="d-flex">
//                                                         <button className="btn btn-warning me-2 btn-sm" onClick={() => startEditing(user)}>Edit</button>
//                                                         <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Users;
