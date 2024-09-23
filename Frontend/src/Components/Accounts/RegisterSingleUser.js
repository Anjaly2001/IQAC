import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "./ListUser.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  user_register,
  campus_list,
  department_list_by_campus,
  updateUser,
} from "../../axios/api";
import Sidebar from "../../Sidebar";

const RegisterSingleUser = () => {
  const [userName, setUserName] = useState("");
  const [userEmpId, setUserEmpId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const domain = "@christuniversity.in"; // Fixed domain
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [customDepartment, setCustomDepartment] = useState("");
  const [userCampus, setUserCampus] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userNameError, setUserNameError] = useState("");
  const [userEmpIdError, setUserEmpIdError] = useState("");
  const [userPhoneNumberError, setUserPhoneNumberError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userRoleError, setUserRoleError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [userId, setUserId] = useState(null); // For local state
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await campus_list();
        setCampuses(response);
      } catch (error) {
        console.error("Failed to fetch campuses:", error);
        toast.error("Failed to load campus options.");
      }
    };
    fetchCampuses();
  }, []);

  useEffect(() => {
    const fetchDepartments = async (campusId) => {
      if (!campusId) return; // Do not fetch if campusId is not set
      try {
        const response = await department_list_by_campus(campusId);
        setDepartments(response);
        // console.log(response);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        toast.error("Failed to load department options.");
      }
    };
    fetchDepartments(userCampus); // Trigger fetching departments when userCampus changes
  }, [userCampus]); // Add userCampus as a dependency

  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const validateField = (email) => {
    const allowedPattern = /^[a-zA-Z0-9\s]+$/;

    if (!allowedPattern.test(email)) {
      setFieldError(
        "Field should contain only alphanumeric characters and spaces. Special characters like '@', '()', etc., are not allowed."
      );
    } else {
      setFieldError(""); // Clear the error if valid
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;

    // Remove the domain before validating
    const localPart = value.split("@")[0];
    setUserEmail(value);
    validateEmail(value);

    // Set the complete email with the fixed domain
    const fullEmail = localPart + domain;
    console.log("Full Email:", fullEmail); // Debugging: Log the full email
  };

  const fullEmail = email + domain;
  const data = { email: fullEmail };

  const validateForm = () => {
    let isValid = true;

    // Clear previous error messages
    setUserNameError("");
    setUserEmpIdError("");
    setUserEmailError("");
    setUserPhoneNumberError("");

    if (!userName) {
      setUserNameError("Name is required.");
      isValid = false;
    }
    if (!userEmpId) {
      setUserEmpIdError("Emp ID is required.");
      isValid = false;
    }
    if (!userEmail) {
      setUserEmailError("Email is required.");
      isValid = false;
    }
    if (!userPhoneNumber || userPhoneNumber.length !== 10) {
      setUserPhoneNumberError("Phone number must be 10 digits.");
      isValid = false;
    }
    if (!userCampus) {
      toast.error("Please select a campus.");
      isValid = false;
    }
    if (!userDepartment && userDepartment !== "Others") {
      toast.error("Please select a department.");
      isValid = false;
    }
    if (userDepartment === "Others" && !customDepartment) {
      toast.error("Please enter a department name.");
      isValid = false;
    }

    return isValid;
  };

  const createOrUpdateUser = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const department =
      userDepartment === "Others" ? customDepartment : userDepartment;

    const [firstName, lastName] = userName.split(" "); // Split the userName by space

    const userData = {
      first_name: toTitleCase(firstName), // Assign first part to first_name
      last_name: toTitleCase(lastName) || "", // Assign second part to last_name or set it to an empty string if not provided
      username: userEmail,
      emp_id: userEmpId,
      email: userEmail,
      phone_number: userPhoneNumber,
      department: department,
      location: userCampus,
      role: userRole,
    };

    console.log("Payload to be sent:", userData);

    try {
      let response;

      // Check if you are updating or creating based on the presence of userId
      if (userId) {
        response = await updateUser(userId, userData);
        toast.success("User updated successfully!");
      } else {
        response = await user_register(userData);
        toast.success("User created successfully!");
      }

      navigate("/listuser"); // Redirect to user list after success
    } catch (error) {
      toast.error("Failed to process user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAsterisk = () => <span style={{ color: "red" }}>*</span>;
  // Validation functions
  const validateUserName = (value) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(value)) {
      setUserNameError("Name should contain only alphabets and spaces.");
    } else {
      setUserNameError("");
    }
  };

  const validateEmpId = (value) => {
    const empIdRegex = /^[0-9]*$/;
    if (!empIdRegex.test(value)) {
      setUserEmpIdError("Emp ID should contain only numeric values.");
    } else {
      setUserEmpIdError("");
    }
  };

  const validateEmail = (value) => {
    // Allow only lowercase alphanumeric characters and a single '@'
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(value)) {
      setUserEmailError("Email must be lowercase and contain only one '@'.");
    } else {
      setUserEmailError("");
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setUserPhoneNumberError("Phone number must be 10 digits.");
    } else {
      setUserPhoneNumberError("");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-1">
        <div className="row">
          <div className="col-md-3 justify-content-center p-0">
            {/* Sidebar or other components can go here */}
            <Sidebar />
          </div>
          <div className="col-md-8 mt-1 pt-5">
            <div className="container mt-4">
              <div className="text-center fw-bold fs-5 mb-4">Register User</div>
              <div className="register mt-5">
                <div className="user-actions mb-4">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-userName">
                            Enter the full name of the user.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userName">
                          Name {renderAsterisk()}
                        </label>
                      </OverlayTrigger>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Name"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                          validateUserName(e.target.value);
                        }}
                      />
                      {userNameError && (
                        <div className="text-danger">{userNameError}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-userEmpId">
                            Enter the employee ID.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userEmpId">
                          Emp ID {renderAsterisk()}
                        </label>
                      </OverlayTrigger>
                      <input
                        type="text"
                        className="form-control"
                        id="userEmpId"
                        placeholder="Emp ID"
                        inputMode="numeric"
                        value={userEmpId}
                        onChange={(e) => {
                          setUserEmpId(e.target.value);
                          validateEmpId(e.target.value);
                        }}
                      />
                      {userEmpIdError && (
                        <div className="text-danger">{userEmpIdError}</div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-userEmail">
                            Enter the user's email address.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userEmail">
                          Email {/* Your renderAsterisk function can go here */}
                        </label>
                      </OverlayTrigger>
                      <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        placeholder="Email"
                        value={userEmail}
                        onChange={handleEmailChange}
                      />
                      {userEmailError && (
                        <div className="text-danger">{userEmailError}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-userPhoneNumber">
                            Enter the user's phone number.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userPhoneNumber">
                          Phone Number {renderAsterisk()}
                        </label>
                      </OverlayTrigger>
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input
                          type="tel"
                          className="form-control"
                          id="userPhoneNumber"
                          placeholder="Enter 10-digit phone number"
                          value={userPhoneNumber}
                          onChange={(e) => {
                            setUserPhoneNumber(e.target.value);
                            validatePhoneNumber(e.target.value);
                          }}
                          maxLength={10}
                          inputMode="numeric"
                          pattern="\d{10}"
                          title="Please enter a 10-digit phone number."
                          required
                        />
                      </div>
                      {userPhoneNumberError && (
                        <div className="text-danger">
                          {userPhoneNumberError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-userCampus">
                            Select the user's campus location.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userCampus">
                          Campus {renderAsterisk()}
                        </label>
                      </OverlayTrigger>
                      <select
                        id="userCampus"
                        className="form-select"
                        value={userCampus}
                        onChange={(e) => setUserCampus(e.target.value)}
                      >
                        <option value="">Choose Campus</option>
                        {campuses && campuses.length > 0 ? (
                          campuses.map((loc) => (
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
                        overlay={
                          <Tooltip id="tooltip-userDepartment">
                            Select the user's department. If 'Others' is
                            selected, enter the department name manually.
                          </Tooltip>
                        }
                      >
                        <label htmlFor="userDepartment">
                          Parent Department {renderAsterisk()}
                        </label>
                      </OverlayTrigger>
                      <select
                        id="userDepartment"
                        className="form-select"
                        value={userDepartment}
                        onChange={(e) => setUserDepartment(e.target.value)}
                        disabled={!userCampus || campuses.length === 0}
                      >
                        <option value="">Select Department</option>
                        {departments && departments.length > 0 ? (
                          departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))
                        ) : (
                          <option value="">No departments available</option>
                        )}
                      </select>
                    </div>
                  </div>
                  {userDepartment === "Others" && (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="customDepartment">
                          Enter Department Name {renderAsterisk()}
                        </label>
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
                {/* Role Input */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="userRole">Role {renderAsterisk()}</label>
                    <select
                      id="userRole"
                      className="form-select"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="University_Viewer">
                        University Viewer
                      </option>
                      <option value="Campus_Admin">Campus Admin</option>
                      <option value="Campus_Viewer">Campus Viewer</option>
                      <option value="Department">Department</option>
                    </select>
                  </div>
                </div>
                <div className="text-left">
                  <button
                    className="btn btn-primary"
                    onClick={createOrUpdateUser}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-1"></div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterSingleUser;
