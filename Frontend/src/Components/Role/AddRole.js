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
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const [roles, setRoles] = useState([]); // Add state to store user roles
  const [isRolesFetched, setIsRolesFetched] = useState(false); // New state to track when roles are fetched


  // Fetch campuses when the component is mounted

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await campus_name_list();
        setCampuses(
          data.map((campus) => ({ label: campus.name, value: campus.id }))
        );
      } catch (error) {
        console.error('Error fetching campuses:', error);
        // Optionally, you can show a user-friendly message or handle the error state
      }
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
      setIsRolesFetched(true); // Set the flag to indicate roles have been fetched
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
        <div className="col-md-10 p-7 ">
        <h4 className="fw-bold text-center">Role Settings</h4>

{/* Top Dropdown for Default Campus and Department */}
          <div className="row mt-8">
          <div className="col-md-4">
          <label htmlFor="campus" className="form-label mx-2">
                Current Campus
              </label>
            
            <div className="col-md-4"></div>
              
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
              <div className="col-md-4"></div>
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
              <div className="col-md-4"></div>
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
            <table className="table">
            <thead>
          <tr>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role.department}</td>
              <td>{role.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRole(role.id)} // Assuming `role.id` uniquely identifies the role
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}



          {selectedUser && roles.length === 0 && <p>No roles assigned to this user.</p>}
        </div>

        <div className="mt-3 mb-5">
            <button
              className="btn btn-success"
              onClick={handleAddRoleClick}
              disabled={!isRolesFetched} // Disable button until roles are fetched
            >
              <FontAwesomeIcon icon={faPlus} /> Add Role
            </button>
          </div>
          {showAdditionalFields && (
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="newCampus" className="form-label mx-2">
                  New Campus
                </label>
                <Dropdown
                  id="newCampus"
                  value={selectedNewCampus}
                  options={campuses}
                  onChange={(e) => setSelectedNewCampus(e.value)}
                  placeholder="Select Campus"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="newDepartment" className="form-label mx-2">
                  New Department
                </label>
                <Dropdown
                  id="newDepartment"
                  value={selectedNewDepartment}
                  options={newDepartments}
                  onChange={(e) => setSelectedNewDepartment(e.value)}
                  placeholder="Select Department"
                  disabled={!selectedNewCampus}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="role" className="form-label mx-2">
                  New Role
                </label>
                <Dropdown
                  id="role"
                  value={selectedRole}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                    { label: "Moderator", value: "moderator" },
                  ]}
                  onChange={(e) => setSelectedRole(e.value)}
                  placeholder="Select Role"
                />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!selectedRole || !selectedNewCampus || !selectedNewDepartment}
                >
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
