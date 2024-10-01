import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import SidebarItem from "./common/SidebarItem";
import SidebarSubItem from "./common/SidebarSubItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendar,
  faCog,
  faHome,
  faPlus,
  faEye,
  faSignOutAlt,
  faHandshake,
  faGears,
  faUser,
  faAddressBook,
  faBuilding,
  faUserCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { checkActivePath, mapPathsToSections } from "./common/utils";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userDepartments, setUserDepartments] = useState([]);
  const [openSections, setOpenSections] = useState({
    profiles: false,
    settings: false,
    campus: false,
    department: false,
    AcademicYear: false,
    eventtype: false,
    tags: false,
    accounts: false,
    role: false,
    eventStatus: false,
  });

  // Load openSections from localStorage when the component mounts
  useEffect(() => {
    const storedOpenSections = JSON.parse(localStorage.getItem("openSections"));
    if (storedOpenSections) {
      setOpenSections(storedOpenSections);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("username");
    const role = localStorage.getItem("user_role");
    const departments = JSON.parse(localStorage.getItem("user_departments"));
    console.log(departments);

    if (user) {
      const name = user.split("@")[0]; // Extract part before '@'
      setUserName(name);
    }
    if (role) setUserRole(role);
    if (departments) setUserDepartments(departments);
  }, []);

  useEffect(() => {
    const activeSection = mapPathsToSections(location.pathname);
    if (activeSection) {
      setOpenSections((prev) => ({ ...prev, [activeSection]: true }));
    }
  }, [location]);

  const toggleSection = (section, parent = null) => {
    setOpenSections((prev) => {
      const newOpenSections = { ...prev };

      // If it's a nested section (like settings), keep the parent section open
      if (parent !== null) {
        newOpenSections[parent] = true; // Ensure parent stays open
      }

      // Toggle the current section (whether parent or child)
      newOpenSections[section] = !prev[section];

      // Save the new openSections state in localStorage
      localStorage.setItem("openSections", JSON.stringify(newOpenSections));

      return newOpenSections;
    });
  };


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("username");
    localStorage.removeItem("openSections"); // Optional: Clear sidebar state on logout
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="sidebar text-left fixed open">
      <div className="container-fluid mb-6">
        <div>
          <span className="text-white fw-bolder fs-4 text-decoration-none">
            CHRIST University
            <br />
            IQAC | <span className="fw-normal">EMT</span>
          </span>
          <Nav className="flex-column p-0 mt-5">
            <SidebarSubItem
              path="/dashboard"
              icon={faHome}
              label={userName}
              isActive={checkActivePath("/dashboard")}
            />

            {/* Conditionally render based on role */}
            {userRole === "Admin" && (
              <SidebarItem
                icon={faUsers}
                title="Accounts"
                open={openSections.accounts}
                toggleSection={() => toggleSection("accounts")}
              >
                <SidebarSubItem
                  path="/registerSingleuser"
                  icon={faPlus}
                  label="New User"
                  isActive={checkActivePath("/registerSingleuser")}
                />
                <SidebarSubItem
                  path="/registerMultipleUser"
                  icon={faPlus}
                  label="New Users"
                  isActive={checkActivePath("/registerMultipleUser")}
                />
                <SidebarSubItem
                  path="/listuser"
                  icon={faEye}
                  label="Users List"
                  isActive={checkActivePath("/listuser")}
                />
              </SidebarItem>
            )}

            {/* Roles Section */}
            {userRole === "Admin" && (
              <SidebarItem
                icon={faHandshake}
                title="Roles"
                open={openSections.role}
                toggleSection={() => toggleSection("role")}
              >
                <SidebarSubItem
                  path="/addrole"
                  icon={faPlus}
                  label="Add Role"
                  isActive={checkActivePath("/addrole")}
                />
              </SidebarItem>
            )}

            {/* Profile Section  */}
            {userRole === "Admin" && (
              <SidebarItem
                icon={faUserCircle}
                title="Profiles"
                open={openSections.profiles}
                toggleSection={() => toggleSection("profiles")}
              >
                <SidebarSubItem
                  path="/userprofile"
                  icon={faUser}
                  label="User Profile"
                  isActive={checkActivePath("/userprofile")}
                />
                <SidebarSubItem
                  path="/departmentprofile"
                  icon={faAddressBook}
                  label="Department Profile"
                  isActive={checkActivePath("/departmentprofile")}
                />
                <SidebarSubItem
                  path="/campusprofile"
                  icon={faBuilding}
                  label="Campus Profile"
                  isActive={checkActivePath("/campusprofile")}
                />
              </SidebarItem>
            )}

            {/* Settings Section: Only visible to Admin */}
            {userRole === "Admin" && (
              <SidebarItem
                icon={faCog}
                title="Settings"
                open={openSections.settings}
                toggleSection={() => toggleSection("settings")}
              >
                {/* Campus */}
                <SidebarItem
                  icon={faGears}
                  title="Campus"
                  open={openSections.campus}
                  toggleSection={() => toggleSection("campus", "settings")} // Pass "settings" as the parent
                >
                  <SidebarSubItem
                    path="/createCampus"
                    icon={faPlus}
                    label="New Campus"
                    isActive={checkActivePath("/createCampus")}
                  />
                  <SidebarSubItem
                    path="/listCampus"
                    icon={faEye}
                    label="Campus List"
                    isActive={checkActivePath("/listCampus")}
                  />
                </SidebarItem>

                {/* Department */}
                <SidebarItem
                  icon={faGears}
                  title="Department"
                  open={openSections.department}
                  toggleSection={() => toggleSection("department", "settings")} // Pass "settings" as the parent
                >
                  <SidebarSubItem
                    path="/createdepartments"
                    icon={faPlus}
                    label="New Department"
                    isActive={checkActivePath("/createdepartments")}
                  />
                  <SidebarSubItem
                    path="/listdepartment"
                    icon={faEye}
                    label="Department List"
                    isActive={checkActivePath("/listdepartment")}
                  />
                </SidebarItem>

                {/* Academic Year */}
                <SidebarItem
                  icon={faGears}
                  title="Academic Year"
                  open={openSections.AcademicYear}
                  toggleSection={() => toggleSection("AcademicYear", "settings")} // Pass "settings" as the parent
                >
                  <SidebarSubItem
                    path="/academicyear"
                    icon={faPlus}
                    label="New Academic Year"
                    isActive={checkActivePath("/academicyear")}
                  />
                  <SidebarSubItem
                    path="/listacademicyear"
                    icon={faEye}
                    label="Academic Year List"
                    isActive={checkActivePath("/listacademicyear")}
                  />
                </SidebarItem>

                {/* Event Type */}
                <SidebarItem
                  icon={faGears}
                  title="Event Type"
                  open={openSections.eventtype}
                  toggleSection={() => toggleSection("eventtype", "settings")} // Pass "settings" as the parent
                >
                  <SidebarSubItem
                    path="/eventtype"
                    icon={faPlus}
                    label="New Event Type"
                    isActive={checkActivePath("/eventtype")}
                  />
                  <SidebarSubItem
                    path="/eventtypelist"
                    icon={faEye}
                    label="Event Type List"
                    isActive={checkActivePath("/eventtypelist")}
                  />
                </SidebarItem>

                {/* Tags */}
                <SidebarItem
                  icon={faGears}
                  title="Tags"
                  open={openSections.tags}
                  toggleSection={() => toggleSection("tags", "settings")} // Pass "settings" as the parent
                >
                  <SidebarSubItem
                    path="/createTag"
                    icon={faPlus}
                    label="New Tag"
                    isActive={checkActivePath("/createTag")}
                  />
                  <SidebarSubItem
                    path="/listTag"
                    icon={faEye}
                    label="Tag List"
                    isActive={checkActivePath("/listTag")}
                  />
                </SidebarItem>
              </SidebarItem>
            )}

            {/* Events Section */}
            <SidebarItem
              icon={faCalendar}
              title="Events"
              open={openSections.eventStatus}
              toggleSection={() => toggleSection("eventStatus")}
            >
              <SidebarSubItem
                path="/registerEvent"
                icon={faPlus}
                label="Register Event"
                isActive={checkActivePath("/registerEvent")}
              />
              <SidebarSubItem
                path="/eventproposal"
                icon={faPlus}
                label="Event Proposal"
                isActive={checkActivePath("/eventproposal")}
              />
              <SidebarSubItem
                path="/listevents"
                icon={faEye}
                label="Events List"
                isActive={checkActivePath("/listevents")}
              />
            </SidebarItem>

            {/* Directly render departments without a parent toggle */}
            {userRole === "Department" &&
              Object.keys(userDepartments).length > 0 &&
              Object.entries(userDepartments).map(([departmentName, { id, role }], index) => ( // Destructure to get department ID
                <SidebarItem
                  key={index}
                  icon={faGears}
                  title={departmentName}
                  open={openSections[`department_${id}`]} // Use department ID as key
                  toggleSection={() => toggleSection(`department_${id}`)} // Pass department ID to toggleSection
                >
                  {/* Conditionally render actions based on the role in this specific department */}
                  {role === "Department" || role === "campusAdmin" ? (
                    <>
                      <SidebarSubItem
                        path={`/department/${id}/create-event`} // Department-specific create event
                        icon={faPlus}
                        label="Create Event"
                        isActive={checkActivePath(`/department/${id}/create-event`)}
                      />
                      <SidebarSubItem
                        path={`/department/${id}/edit-event`} // Department-specific edit event
                        icon={faEdit}
                        label="Edit Event"
                        isActive={checkActivePath(`/department/${id}/edit-event`)}
                      />
                    </>
                  ) : (
                    <>
                      {/* Add viewer-specific options if applicable */}
                      <SidebarSubItem
                        path={`/department/${id}/listevents`} // Department-specific event list
                        icon={faEye}
                        label="Events List"
                        isActive={checkActivePath(`/department/${id}/listevents`)}
                      />
                    </>
                  )}
                </SidebarItem>
              ))}

            <Nav.Item>
              <Nav.Link onClick={handleLogout} className="text-light fw-bold">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;