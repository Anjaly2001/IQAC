import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import { department_register, campus_list } from '../../axios/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../Sidebar';

const CreateDepartment = ({ onAddDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [customType, setCustomType] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [message, setMessage] = useState('');  
    const [messageType, setMessageType] = useState('');
    const [departmentNameError, setDepartmentNameError] = useState('');


    const navigate = useNavigate(); // Initialize useNavigate

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const validateDepartmentName = (value) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(value)) {
            setDepartmentNameError("Department name should contain only alphabets and spaces.");
        } else {
            setDepartmentNameError("");
        }
    };
    


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await campus_list();
                if (response && Array.isArray(response)) {
                    setLocations(response);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                toast.error('Failed to fetch locations.');
            }
        };
        fetchLocations();
    }, []);
    
    const handleCreateDepartment = async () => {
        
        const finalType = type === 'Others' ? customType : type;
        const finalLocation = location === 'Others' ? customLocation : location;
    
        if (departmentName && description && finalType && finalLocation) {
            const newDepartment = {
                name: toTitleCase(departmentName),
                type: finalType,
                location_id: finalLocation,
                description,
            };
    
            try {
                const response = await department_register(newDepartment);
                toast.success('Department created successfully!');
                setMessage('Department created successfully!');
                setMessageType('success');
    
                // Clear form fields after successful submission
                setDepartmentName('');
                setDescription('');
                setType('');
                setLocation('');
                setCustomType('');
                setCustomLocation('');
    
                // Redirect to department list page after successful creation
                navigate('/listdepartment');
            } catch (error) {
                console.error('Failed to create department:', error);
                toast.error('Failed to create department');
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };
    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3" style={{ maxWidth: '800px' }}>
                        <div className="text-center fw-bold fs-5 mb-4">
                            Create Department
                        </div>
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="departmentName">Department Name{renderAsterisk()}</label>
                                <InputText
                                    id="departmentName"
                                    value={departmentName}
                                    onChange={(e) => {
                                        setDepartmentName(e.target.value);
                                        validateDepartmentName(e.target.value);  // Call validation here
                                    }}
                                    placeholder="Enter department name"
                                    className="w-100"
                                />
                                {departmentNameError && <small style={{ color: 'red' }}>{departmentNameError}</small>}
                            

                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description{renderAsterisk()}</label>
                                <Editor
                                    id="description"
                                    value={description}
                                    onTextChange={(e) => setDescription(e.htmlValue)}
                                    style={{ height: '320px' }}
                                    placeholder="Enter description here..."
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="type">Type{renderAsterisk()}</label>
                                <select
                                    id="type"
                                    className="form-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Choose Type</option>
                                    <option value="Department">Department</option>
                                    <option value="Club">Club</option>
                                    <option value="Center">Center</option>
                                    <option value="Office">Office</option>
                                    <option value="Cell">Cell</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            {/* {type === 'Others' && (
                                <div className="p-field w-100 mb-3">
                                    <label htmlFor="customType">Enter Type</label>
                                    <InputText
                                        id="customType"
                                        value={customType}
                                        onChange={(e) => setCustomType(e.target.value)}
                                        placeholder="Enter type"
                                        className="w-100"
                                    />
                                </div>
                            )} */}
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="location">Location{renderAsterisk()}</label>
                                <select
                                    id="location"
                                    className="form-select"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Choose Location</option>
                                    {locations.length > 0 ? (
                                        locations.map(loc => (
                                            <option key={loc.id} value={loc.id}>
                                                {loc.campus}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No locations available</option>
                                    )}
                                    {/* <option value="Others">Others</option> */}
                                </select>
                            </div>
                            {/* {location === 'Others' && (
                                <div className="p-field w-100 mb-3">
                                    <label htmlFor="customLocation">Enter Location</label>
                                    <InputText
                                        id="customLocation"
                                        value={customLocation}
                                        onChange={(e) => setCustomLocation(e.target.value)}
                                        placeholder="Enter location"
                                        className="w-100"
                                    />
                                </div> */}
                            {/* )} */}
                            <div className="p-field w-100">
                                <Button label="Create Department" icon="pi pi-check" onClick={handleCreateDepartment} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartment;
















// import React, { useState, useEffect } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Editor } from 'primereact/editor';
// import { Button } from 'primereact/button';
// import AdminDashboard from '../Admin/AdminDashboard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { department_register, campus_list } from '../../axios/api';


// const CreateDepartment = ({ onAddDepartment }) => {
//     const [departmentName, setDepartmentName] = useState('');
//     const [description, setDescription] = useState('');
//     const [type, setType] = useState('');
//     const [location, setLocation] = useState('');
//     const [customType, setCustomType] = useState('');
//     const [customLocation, setCustomLocation] = useState('');
//     const [locations, setLocations] = useState([]); // Initialized with an empty array
//     const [message, setMessage] = useState('');  
//     const [messageType, setMessageType] = useState('');

//     useEffect(() => {
//         const fetchLocations = async () => {
//             // if (!areFieldsFilled()) {
//             //     toast.error('Please fill in all fields.');
//             //     return;  // Exit early if validation fails
//             // }
            
//             try {
//                 const response = await campus_list();
//                 console.log('Fetched locations:', response); 
//                 if (response && Array.isArray(response)) {
//                     setLocations(response);  // Update the state with fetched data if it's an array
//                 } else {
//                     console.error('Unexpected response format:', response);
//                     // Handle unexpected format
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch locations:', error);
//                 toast.error('Failed to fetch locations.'); 
//                 // Handle the error appropriately
//             }
            
    
//         };
//         fetchLocations();
//     }, []); 
//     // useEffect(() => {
//     //     const fetchLocations = async () => {
//     //         // Check if all fields are filled before making the API call
//     //         if (!areFieldsFilled()) {
//     //             toast.error('Please fill in all fields.');  // Display error message
//     //             return;  // Exit early if validation fails
//     //         }
            
//     //         try {
//     //             const response = await campus_list(); // Assuming campus_list() is your API call function
//     //             console.log('Fetched locations:', response); 
                
//     //             if (response && Array.isArray(response)) {
//     //                 setLocations(response);  // Update the state with the fetched data if it's in an expected format (array)
//     //             } else {
//     //                 console.error('Unexpected response format:', response);
//     //                 // Handle any unexpected response format here
//     //             }
//     //         } catch (error) {
//     //             console.error('Failed to fetch locations:', error);
//     //             toast.error('Failed to fetch locations.'); 
//     //             // Handle the error appropriately, e.g., show a message to the user
//     //         }
//     //     };
    
//     //     fetchLocations();  // Call the async function to fetch the data when the component mounts
//     // }, []);  // Empty dependency array means this effect runs once when the component mounts
    
//     const handleCreateDepartment = async () => {
//         const finalType = type === 'Others' ? customType : type;
//         const finalLocation = location === 'Others' ? customLocation : location;

//         // Ensure that all required fields are filled
//         if (departmentName && description && finalType && finalLocation) {
//             const newDepartment = {
//                 name: departmentName,
//                 type: finalType,
//                 location: finalLocation,
//                 description
//             };

//             try {
//                 const response = await department_register(newDepartment);
//                 console.log('Created department response:', response.data);

//                 toast.success('Department created successfully!');
//                 setMessage('Department created successfully!');
//                 setMessageType('success');

//                 // Clear form fields after successful submission
//                 setDepartmentName('');
//                 setDescription('');
//                 setType('');
//                 setLocation('');
//                 setCustomType('');
//                 setCustomLocation('');
//             } catch (error) {
//                 console.error('Failed to create department:', error);
//                 // Handle the error appropriately
//             }
//         }else {
//             // Display an error message if any required field is missing
//             toast.error('Please fill in all fields.');
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <ToastContainer />
//             <div className="row">
//                 {/* Sidebar component for the Admin Dashboard */}
//                 <div className="col-md-2 p-0">
//                     <AdminDashboard />
//                 </div>
                
//                 {/* Main content area for creating a new department */}
//                 <div className="col-md-10 mt-5 pt-5">
//                     <div className="container mt-3" style={{ maxWidth: '800px' }}>
//                         <div className="text-center fw-bold fs-5 mb-4">
//                             Create Department
//                         </div>
                        
//                         {/* Form fields for department details */}
//                         <div className="d-flex flex-column align-items-center mb-4">
//                             <div className="p-field w-100 mb-3">
//                                 <label htmlFor="departmentName">Department Name</label>
//                                 <InputText
//                                     id="departmentName"
//                                     value={departmentName}
//                                     onChange={(e) => setDepartmentName(e.target.value)}
//                                     placeholder="Enter department name"
//                                     className="w-100"
//                                 />
//                             </div>
                            
//                             <div className="p-field w-100 mb-3">
//                                 <label htmlFor="description">Description</label>
//                                 <Editor
//                                     id="description"
//                                     value={description}
//                                     onTextChange={(e) => setDescription(e.htmlValue)}
//                                     style={{ height: '320px' }}
//                                     placeholder="Enter description here..."
//                                     className="w-100"
//                                 />
//                             </div>

//                             <div className="p-field w-100 mb-3">
//                                 <label htmlFor="type">Type</label>
//                                 <select
//                                     id="type"
//                                     className="form-select"
//                                     value={type}
//                                     onChange={(e) => setType(e.target.value)}
//                                 >
//                                     <option value="">Choose Type</option>
//                                     <option value="Department">Department</option>
//                                     <option value="Club">Club</option>
//                                     <option value="Center">Center</option>
//                                     <option value="Office">Office</option>
//                                     <option value="Cell">Cell</option>
//                                     <option value="Others">Others</option>
//                                 </select>
//                             </div>

//                             {/* Display input for custom type if 'Others' is selected */}
//                             {type === 'Others' && (
//                                 <div className="p-field w-100 mb-3">
//                                     <label htmlFor="customType">Enter Type</label>
//                                     <InputText
//                                         id="customType"
//                                         value={customType}
//                                         onChange={(e) => setCustomType(e.target.value)}
//                                         placeholder="Enter type"
//                                         className="w-100"
//                                     />
//                                 </div>
//                             )}

//                             <div className="p-field w-100 mb-3">
//                                 <label htmlFor="location">Location</label>
//                                 <select
//                                     id="location"
//                                     className="form-select"
//                                     value={location}
//                                     onChange={(e) => setLocation(e.target.value)}
//                                 >
//                                     <option value="">Choose Location</option>
//                                     {locations.length > 0 ? (
//                                         locations.map(loc => (
//                                             <option key={loc.id} value={loc.id}>
//                                                 {loc.campus}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option value="">No locations available</option>
//                                     )}
//                                     <option value="Others">Others</option>
//                                 </select>
//                             </div>

//                             {/* Display input for custom location if 'Others' is selected */}
//                             {location === 'Others' && (
//                                 <div className="p-field w-100 mb-3">
//                                     <label htmlFor="customLocation">Enter Location</label>
//                                     <InputText
//                                         id="customLocation"
//                                         value={customLocation}
//                                         onChange={(e) => setCustomLocation(e.target.value)}
//                                         placeholder="Enter location"
//                                         className="w-100"
//                                     />
//                                 </div>
//                             )}

//                             {/* Button to trigger department creation */}
//                             <div className="p-field w-100">
//                                 <Button label="Create Department" icon="pi pi-check" onClick={handleCreateDepartment} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateDepartment;