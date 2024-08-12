import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AdminDashboard from '../Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Map = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        // Mock data, replace with real data fetching
        const mockUsers = [
            { id: 1, name: 'Thomas', empId: '20101', email: 'thomas@example.com', department: 'HOD', campus: 'Central Campus', status: true },
            { id: 2, name: 'Shine', empId: '20306', email: 'shine@example.com', department: 'Coordinator', campus: 'Lavasa Campus', status: false },
        ];
        setUsers(mockUsers);
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={rowData.status ? 'badge bg-success' : 'badge bg-secondary'}>
                {rowData.status ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button className="btn btn-primary me-2 btn-sm">
                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                </button>
                <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
                </button>
            </>
        );
    };

    return (
        <div>
            <AdminDashboard />
            <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-md-2 p-0">
                        {/* Sidebar or other components can go here */}
                    </div>
                    <div className="col-md-10 mt-1 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">User List</div>
                            <div className="table-container">
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    emptyMessage="No users found."
                                    className="user-data-table"
                                >
                                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
                                    <Column field="empId" header="Emp ID" filter filterPlaceholder="Search by Emp ID" />
                                    <Column field="email" header="Email" filter filterPlaceholder="Search by email" />
                                    <Column field="department" header="Department" filter filterPlaceholder="Search by department" />
                                    <Column field="campus" header="Campus" filter filterPlaceholder="Search by campus" />
                                    <Column field="status" header="Status" body={statusBodyTemplate} filter filterPlaceholder="Search by status" />
                                    <Column body={actionBodyTemplate} exportable={false} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;








// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import AdminDashboard from '../Admin/AdminDashboard';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

// const upArrow = -1;
// const downArrow = 1;

// const Map = () => {
//     const [users, setUsers] = useState([]);
//     const [propsVal, setStatePropsFun] = useState({ list1: [], list2: [] });
//     const [campus, setCampus] = useState('');
//     const [department, setDepartment] = useState('');
//     const [selectedDepartment, setSelectedDepartment] = useState('');

//     useEffect(() => {
//         fetchUsers();
//         fetchTransferListData();
//     }, []);

//     const fetchUsers = async () => {
//         // Mock data, replace with real data fetching
//         const mockUsers = [
//             { id: 1, name: 'Thomas', empId: '20101', email: 'thomas@example.com', department: 'HOD', campus: 'Central Campus', status: true },
//             { id: 2, name: 'Shine', empId: '20306', email: 'shine@example.com', department: 'Coordinator', campus: 'Lavasa Campus', status: false },
//         ];
//         setUsers(mockUsers);
//     };

//     const fetchTransferListData = async () => {
//         try {
//             const response = await axios.get('./myjson.json');
//             setStatePropsFun({
//                 list1: response.data.itemList1,
//                 list2: response.data.itemList2
//             });
//         } catch (error) {
//             console.log("Error Loading data");
//         }
//     };

//     const statusBodyTemplate = (rowData) => {
//         return (
//             <span className={rowData.status ? 'badge bg-success' : 'badge bg-secondary'}>
//                 {rowData.status ? 'Active' : 'Inactive'}
//             </span>
//         );
//     };

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <>
//                 <button className="btn btn-primary me-2 btn-sm">
//                     <i className="fas fa-edit"></i> {/* Edit Icon */}
//                 </button>
//                 <button className="btn btn-danger btn-sm">
//                     <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
//                 </button>
//             </>
//         );
//     };

//     const handleChange = (e) => {
//         const value = parseInt(e.target.value);
//         const updatedList1 = propsVal.list1.map((res1) => {
//             if (res1.id === value) {
//                 res1.checked = e.target.checked;
//             }
//             return res1;
//         });

//         const updatedList2 = propsVal.list2.map((res2) => {
//             if (res2.id === value) {
//                 res2.checked = e.target.checked;
//             }
//             return res2;
//         });

//         setStatePropsFun({
//             list1: updatedList1,
//             list2: updatedList2
//         });
//     };

//     const handleMove = (direction) => {
//         if (direction === 'left') {
//             const updatedList1 = propsVal.list1.filter(i => !i.checked);
//             const movedItems = propsVal.list1.filter(i => i.checked);
//             setStatePropsFun({
//                 list1: updatedList1,
//                 list2: [...propsVal.list2, ...movedItems]
//             });
//         } else if (direction === 'right') {
//             const updatedList2 = propsVal.list2.filter(i => !i.checked);
//             const movedItems = propsVal.list2.filter(i => i.checked);
//             setStatePropsFun({
//                 list1: [...propsVal.list1, ...movedItems],
//                 list2: updatedList2
//             });
//         }
//     };

//     const moveItems = (id, direction) => {
//         const position = propsVal.list2.findIndex((i) => i.id === id);
//         if (position < 0) {
//             throw new Error("Id and Direction not found.");
//         } else if ((direction === upArrow && position === 0) || (direction === downArrow && position === propsVal.list2.length - 1)) {
//             return console.log("Can't Go Down/Up");
//         }

//         const itemPosition = propsVal.list2[position];
//         const filterItems = propsVal.list2.filter((i) => i.id !== id);
//         filterItems.splice(position + direction, 0, itemPosition);
//         setStatePropsFun({
//             list2: filterItems,
//             list1: [...propsVal.list1]
//         });
//     };

//     const moveAllData = (direction) => {
//         if (direction === 'left') {
//             setStatePropsFun({
//                 list1: [...propsVal.list1, ...propsVal.list2],
//                 list2: []
//             });
//         } else {
//             setStatePropsFun({
//                 list2: [...propsVal.list2, ...propsVal.list1],
//                 list1: []
//             });
//         }
//     };

//     const handleCampusChange = (e) => {
//         setCampus(e.target.value);
//     };

//     const handleDepartmentChange = (e) => {
//         setDepartment(e.target.value);
//     };

//     const handleSelectedDepartmentChange = (e) => {
//         setSelectedDepartment(e.target.value);
//     };

//     const LeftlistDisplay = propsVal.list1.length ? (propsVal.list1.map(leftRes => {
//         return (
//             <div className="subContainer" key={leftRes.id}>
//                 <input type="checkbox" checked={leftRes.checked} value={leftRes.id} className="fa fa-checkbox" onChange={handleChange} />
//                 <span>{leftRes.text}</span>
//             </div>
//         );
//     })
//     ) : (
//         <div className="error">Empty Content Please enter Data</div>
//     );

//     const RightlistDisplay = propsVal.list2.length ? (propsVal.list2.map(rightRes => {
//         return (
//             <div key={rightRes.id}>
//                 <div className="subContainer">
//                     <input type="checkbox" checked={rightRes.checked} className="fa fa-checkbox" value={rightRes.id} onChange={handleChange} />
//                     <span>{rightRes.text}</span>
//                     <div className="moveArrows">
//                         <Link to="#" className="fa fa-sort-up" onClick={() => moveItems(rightRes.id, upArrow)}></Link>
//                         <Link to="#" className="fa fa-sort-down" onClick={() => moveItems(rightRes.id, downArrow)}></Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     })
//     ) : (
//         <div className="error">Empty Content Please enter Data</div>
//     );

//     return (
//         <div>
//             <AdminDashboard />
//             <div className="container-fluid mt-1">
//                 <div className="row">
//                     <div className="col-md-2 p-0">
//                         {/* Sidebar or other components can go here */}
//                     </div>
//                     <div className="col-md-10 mt-1 pt-5">
//                         <div className="container mt-3">
//                             <div className="text-center fw-bold fs-5 mb-4">User List</div>
//                             <div className="table-container">
//                                 <DataTable
//                                     value={users}
//                                     paginator
//                                     rows={10}
//                                     dataKey="id"
//                                     emptyMessage="No users found."
//                                     className="user-data-table"
//                                 >
//                                     <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
//                                     <Column field="empId" header="Emp ID" filter filterPlaceholder="Search by Emp ID" />
//                                     <Column field="email" header="Email" filter filterPlaceholder="Search by email" />
//                                     <Column field="department" header="Department" filter filterPlaceholder="Search by department" />
//                                     <Column field="campus" header="Campus" filter filterPlaceholder="Search by campus" />
//                                     <Column field="status" header="Status" body={statusBodyTemplate} filter filterPlaceholder="Search by status" />
//                                     <Column body={actionBodyTemplate} exportable={false} />
//                                 </DataTable>
//                             </div>
//                         </div>

//                         {/* TransferList Component */}
//                         <div className="transfer-list-section mt-5">
//                             <div className="container">
//                                 <div className="left-side">
//                                     <div className="filter-section">
//                                         <label htmlFor="campus">Select Campus:</label>
//                                         <select id="campus" value={campus} onChange={handleCampusChange}>
//                                             <option value="">Select Campus</option>
//                                             <option value="Central Campus">Central Campus</option>
//                                             <option value="Lavasa Campus">Lavasa Campus</option>
//                                         </select>

//                                         <label htmlFor="department">Select Department:</label>
//                                         <select id="department" value={department} onChange={handleDepartmentChange}>
//                                             <option value="">Select Department</option>
//                                             <option value="HOD">HOD</option>
//                                             <option value="Coordinator">Coordinator</option>
//                                         </select>
//                                     </div>
//                                     <div className="list-section">
//                                         {LeftlistDisplay}
//                                     </div>
//                                 </div>

//                                 <div className="move-buttons">
//                                     <button className="btn btn-primary" onClick={() => handleMove('left')}>Move Left</button>
//                                     <button className="btn btn-primary" onClick={() => handleMove('right')}>Move Right</button>
//                                 </div>

//                                 <div className="right-side">
//                                     <div className="list-section">
//                                         {RightlistDisplay}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* End of TransferList Component */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Map;
