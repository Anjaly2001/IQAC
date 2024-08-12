// import React, { useState, useEffect } from 'react';
// import ReportService from '../../Services/ReportService';
// import './Admin.css';
// import Header from '../Common/Header';
// import AdminSidebar from './AdminSidebar';

// const Pending = () => {
//   const [pendingReports, setPendingReports] = useState([]);
//   const [showRejectComment, setShowRejectComment] = useState(false);
//   const [rejectComment, setRejectComment] = useState('');

//   useEffect(() => {
//     fetchPendingReports();
//   }, []);

//   const fetchPendingReports = async () => {
//     const response = await ReportService.getPendingReports();
//     setPendingReports(response.data);
//   };

//   const viewReport = (reportId) => {
//     // Implement view functionality
//   };

//   const downloadReport = (reportId) => {
//     // Implement download functionality
//   };

//   const approveReport = (reportId) => {
//     // Implement approve functionality
//   };

//   const rejectReport = (reportId) => {
//     // Show the reject comment textbox
//     setShowRejectComment(true);
//   };

//   const handleCommentChange = (e) => {
//     setRejectComment(e.target.value);
//   };

//   const saveComment = (reportId) => {
//     // Implement save comment functionality
//     console.log('Reject Comment:', rejectComment);
//     setShowRejectComment(false);
//     setRejectComment('');
//   };

//   const departments = ['Department 1', 'Department 2', 'Department 3'];

//   return (
//     <div>
//       <Header />
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-2 p-0">
//             <AdminSidebar />
//           </div>
//           <div className="col-md-10  mt-5 pt-5">
//             <div className="container mt-3">
//               <div className="text-center fw-bold fs-5 mb-4">
//                 Pending Reports
//               </div>
//               <div className="d-flex justify-content-between mb-3">
//                 <input type="text" className="form-control me-2" placeholder="Event Title" />
//                 <select className="form-select me-2">
//                   <option value="">Select Department</option>
//                   {departments.map((dept, index) => (
//                     <option key={index} value={dept}>{dept}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary">View</button>
//               </div>
//               <div className="d-flex justify-content-end">
//                 <button className="btn btn-secondary me-2" onClick={downloadReport}>Download</button>
//                 <button className="btn btn-success me-2" onClick={approveReport}>Approve</button>
//                 <button className="btn btn-danger me-2" onClick={rejectReport}>Reject</button>
//                 <button className="btn btn-info" onClick={() => setShowRejectComment(true)}>Comment</button>
//               </div>
//               {showRejectComment && (
//                 <div className="mt-3">
//                   <textarea
//                     className="form-control mb-2"
//                     value={rejectComment}
//                     onChange={handleCommentChange}
//                     placeholder="Enter your comment"
//                   />
//                   <button className="btn btn-success" onClick={saveComment}>Save</button>
//                 </div>
//               )}
//               {/* Add pending events content here */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pending;
