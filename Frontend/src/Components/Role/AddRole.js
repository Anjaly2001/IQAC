import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave,faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  campus_name_list,
  department_list_by_campus,
  user_list_by_department,
  user_department_role,
  assignUserRole,
  deleteUserRole,
} from "../../axios/api"; // Assuming you have an API call to fetch users
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar";

const AddRole = () => {
  // States for top dropdowns (showing current user campus/department)
  const [currentCampus, setCurrentCampus] = useState(null);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  // States for bottom dropdowns (for assigning new roles)
  const [selectedNewCampus, setSelectedNewCampus] = useState(null);
  const [selectedNewDepartment, setSelectedNewDepartment] = useState(null);

  // Separate state for new dropdowns departments
  const [newDepartments, setNewDepartments] = useState([]);

  const [campuses, setCampuses] = useState([]);
  const [currentDepartments, setCurrentDepartments] = useState([]); // Separate state for current department list
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const [roles, setRoles] = useState([]); // Add state to store user roles

  // Fetch campuses when the component is mounted
  useEffect(() => {
    const fetchCampuses = async () => {
      const data = await campus_name_list();
      setCampuses(
        data.map((campus) => ({ label: campus.name, value: campus.id }))
      );
    };
    fetchCampuses();
  }, []);

  // Fetch departments for the current campus
  useEffect(() => {
    const fetchDepartments = async (campusId, setDeptState) => {
      if (!campusId) return;
      try {
        const response = await department_list_by_campus(campusId);
        setDeptState(
          response.map((department) => ({
            label: department.name,
            value: department.id,
          }))
        );
      } catch (error) {
        toast.error("Failed to load department options.");
      }
    };
    // Fetch departments for current dropdown
    if (currentCampus) fetchDepartments(currentCampus, setCurrentDepartments);
  }, [currentCampus]);

  // Fetch departments for new campus (separate dropdown)
  useEffect(() => {
    const fetchDepartments = async (campusId) => {
      if (!campusId) return;
      try {
        const response = await department_list_by_campus(campusId);
        setNewDepartments(
          response.map((department) => ({
            label: department.name,
            value: department.id,
          }))
        );
      } catch (error) {
        toast.error("Failed to load new department options.");
      }
    };
    if (selectedNewCampus) fetchDepartments(selectedNewCampus);
  }, [selectedNewCampus]);

  // Fetch users when a department is selected (for current dropdowns)
  useEffect(() => {
    const fetchUsers = async (departmentId) => {
      if (!departmentId) return;
      try {
        const response = await user_list_by_department(departmentId); // API call

        // Extract users from response
        const users = response.users || []; // Ensure there's always an array
        setUsers(
          users.map((user) => ({ label: user.username, value: user.id }))
        ); // Map users to dropdown options
      } catch (error) {
        toast.error("Failed to load user options.");
      }
    };

    fetchUsers(currentDepartment); // Fetch users based on currentDepartment
  }, [currentDepartment]); // Dependency array to trigger the effect when currentDepartment changes

  // Handle user selection and fetch default department, campus, and role
  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);
    try {
      // Fetch and set current campus/department/role based on selected user
      const userData = await user_department_role(userId); // Assuming this API exists
      console.log(userData);

      // Store the roles in the state
      if (userData && userData.roles) {
        setRoles(userData.roles); // Store the roles in the state
      } else {
        setRoles([]); // If no roles found, clear the roles state
        toast.error("No roles found for this user");
      }
    } catch (error) {
      console.error("Failed to fetch user roles", error);
      toast.error("Failed to fetch user roles");
    }
  };

  const handleAddRoleClick = () => {
    setShowAdditionalFields(true);
  };

  const handleSave = async () => {
    if (!selectedUser || !selectedRole || !selectedNewCampus || !selectedNewDepartment) {
      toast.error("Please fill all the fields");
      return;
    }
  
    const roleData = {
        users: selectedUser,
      role: selectedRole,
      department: selectedNewDepartment,
    };
  
    try {
      // Make the API call to assign the new role to the user
      await assignUserRole(roleData);
      toast.success("Role assigned successfully!");
  
      // Optionally reset the form or fields after a successful save
      setSelectedRole(null);
      setSelectedNewCampus(null);
      setSelectedNewDepartment(null);
      setShowAdditionalFields(false); // Hide the additional fields again
       // Refresh the page after saving
       await handleUserSelect(selectedUser);
    } catch (error) {
      console.error("Error assigning role:", error);
      toast.error("Failed to assign role. Please try again.");
    }
  };

  // Function to delete a role
const handleDeleteRole = async (roleId) => {
    if (!selectedUser || !roleId) return;
  
    try {
      // API call to delete the role for the user
      await deleteUserRole(roleId); // Assuming `deleteUserRole` API call exists
      toast.success("Role deleted successfully!");
  
      // Refresh the user's role list after deletion
      await handleUserSelect(selectedUser);
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role. Please try again.");
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 bg-light p-3">
          <Sidebar />
        </div>
        <div className="col-md-10 p-7">
          <h1 className="text-center fw-bold fs-5 mb-4">Role Settings</h1>

          <div className="row mt-6">
            {/* Top Dropdown for Default Campus and Department */}
            <div className="col-md-4">
              <label htmlFor="campus" className="form-label mx-2">
                Current Campus
              </label>
              <Dropdown
                id="currentCampus"
                value={currentCampus}
                options={campuses}
                onChange={(e) => setCurrentCampus(e.value)}
                placeholder="Select Campus"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="department" className="form-label mx-2">
                Current Department
              </label>
              <Dropdown
                id="currentDepartment"
                value={currentDepartment}
                options={currentDepartments}
                onChange={(e) => setCurrentDepartment(e.value)}
                placeholder="Select Department"
                disabled={!currentCampus}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="user" className="form-label mx-2">
                User
              </label>
              <Dropdown
                id="user"
                value={selectedUser}
                options={users}
                onChange={(e) => handleUserSelect(e.value)}
                placeholder="Select User"
                disabled={!currentDepartment}
              />
            </div>
          </div>

          <div className="my-3">
          {roles.length > 0 && (
            <div className="mt-3">
              <h5>User Roles:</h5>
              <ul>
                {roles.map((role, index) => (
                  <li key={index} className="mt-3">
                    <strong>Department:</strong> {role.department},{" "}
                    <strong>Role:</strong> {role.role}
                    {/* Add a delete button next to each role */}
                    <button
                      className="btn btn-danger ms-2 fs-6 "
                      onClick={() => handleDeleteRole(role.id)} // Assuming `role.id` uniquely identifies the role
                    >
                      <FontAwesomeIcon icon={faTrash} /> 
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedUser && roles.length === 0 && <p>No roles assigned to this user.</p>}
        </div>

          <div className="mt-3 mb-5">
            {!showAdditionalFields && (
              <button className="btn btn-success" onClick={handleAddRoleClick}>
                <FontAwesomeIcon icon={faPlus} /> Add Role
              </button>
            )}
          </div>

          {showAdditionalFields && (
            <>
            <span className="m-5 p-5 fw-bold fs-5">New Role</span>

            
              <div className="row mt-4">
                {/* Bottom Dropdown for Assigning New Role (Separate from Top Dropdowns) */}
                <div className="col-md-4">
                  <label htmlFor="role" className="form-label mx-2">
                    Role
                  </label>
                  <Dropdown
                    id="role"
                    value={selectedRole}
                    options={[
                      { label: "Department HOD", value: "departmentHOD" },
                      { label: "IQAC User", value: "IQACuser" },
                      { label: "Staffs", value: "Staffs" },
   
                      // Add more roles as needed
                    ]} // Sample roles
                    onChange={(e) => setSelectedRole(e.value)}
                    placeholder="Select Role"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="newCampus" className="form-label mx-2">
                    New Campus
                  </label>
                  <Dropdown
                    id="newCampus"
                    value={selectedNewCampus}
                    options={campuses}
                    onChange={(e) => setSelectedNewCampus(e.value)}
                    placeholder="Select New Campus"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="newDepartment" className="form-label mx-2">
                    New Department
                  </label>
                  <Dropdown
                    id="newDepartment"
                    value={selectedNewDepartment}
                    options={newDepartments}
                    onChange={(e) => setSelectedNewDepartment(e.value)}
                    placeholder="Select New Department"
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12 text-start">
                  <button className="btn btn-primary" onClick={handleSave}>
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRole;
