import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import EventSummary from "./EventSummary"; // Import the EventSummary component
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Editor } from "primereact/editor";
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../Sidebar";
import { toast } from "react-toastify";
import './event.css'
import {
  campus_name_list,
  department_list_by_campus,
  user_list_by_department,
  event_type_list,
  academic_list_campus,
  list_tags,
  register_event,
  proposal_file_upload,
} from "../../axios/api";
import "primereact/resources/themes/saga-blue/theme.css"; // Import theme
import "primereact/resources/primereact.min.css"; // Import PrimeReact CSS

function RegisterEvent() {
  const [campus, setCampus] = useState(""); // Holds the selected campus ID
  const [campuses, setCampuses] = useState([]); // Holds the list of campuses
  const [department, setDepartment] = useState(""); // Holds the selected department ID
  const [departments, setDepartments] = useState([]); // Holds the list of departments
  const [academicYear, setAcademicYear] = useState(null);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [eventType, setEventType] = useState(null);
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [collaborators, setCollaborators] = useState([
    { campus: "", department: "", name: "", departments: [], users: [] },
  ]);
  const [tags, setTags] = useState([]); // For holding the selected tags
  const [tagOptions, setTagOptions] = useState([]); // For holding the available tag options

  const [description, setDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [numberOfActivities, setNumberOfActivities] = useState(1);
  const [activities, setActivities] = useState([
    { title: "", date: "", startTime: "", endTime: "", description: "", venue: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [proposal, setProposal] = useState(null);

  const [tag, setTag] = useState("");
  const [submitted, setSubmitted] = useState(false); // New state to check if form is submitted
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const [eventTitleError, setEventTitleError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate a single field

  // Validate the form
  const validateForm = () => {
    // return (
    //   eventTitle &&
    //   venue &&
    //   description &&
    //   campus &&
    //   department &&
    //   eventType &&
    //   academicYear
    // );
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [
    eventTitle,
    venue,
    description,
    campus,
    department,
    eventType,
    academicYear,
  ]);

  // Fetch campuses on mount
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await campus_name_list();
        setCampuses(data); // Assuming data is an array of campus objects
      } catch (error) {
        toast.error("Failed to load campus options.");
      }
    };
    fetchCampuses();
  }, []);

  // Fetch departments when campus changes
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!campus) return; // Exit if no campus is selected
      try {
        const response = await department_list_by_campus(campus);
        setDepartments(response); // Assuming response is an array of departments
      } catch (error) {
        toast.error("Failed to load department options.");
      }
    };

    if (campus) {
      fetchDepartments();
    }
  }, [campus]); // Re-run the effect when `campus` changes

  // Fetch academic years when campus changes
  useEffect(() => {
    const fetchAcademicYearOptions = async () => {
      if (!campus) return; // Exit if no campus is selected
      try {
        const response = await academic_list_campus(campus); // Fetch academic years based on campus
        const academicYears = Array.isArray(response)
          ? response
          : response.data || [];

        const mappedAcademicYears = academicYears.map((year) => ({
          label: `${year.label}`, // Format as "2024-2025 (2024-07-02 - 2024-08-02)"
          value: year.id, // Use id as value
        }));

        setAcademicYearOptions(mappedAcademicYears);
      } catch (error) {
        console.error("Error fetching academic years:", error);
        toast.error("Failed to load academic year options.");
      }
    };

    if (campus) {
      fetchAcademicYearOptions(); // Fetch when campus is selected
    }
  }, [campus]); // Run the effect only when the campus changes

  // Fetch event types on mount
  useEffect(() => {
    const fetchEventTypeOptions = async () => {
      try {
        const response = await event_type_list(); // API call to get event types
        const eventTypes = response.map((event) => ({
          label: event.title, // Assuming the response has a 'title' field
          value: event.id, // Assuming the response has an 'id' field
        }));
        setEventTypeOptions(eventTypes);
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    };

    fetchEventTypeOptions(); // Fetch event types on mount
  }, []); // Empty dependency array to run only on mount

  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await list_tags(); // Assuming this is your API call
        const tags = Array.isArray(data) ? data : data.data || [];

        // Map the tags to the format expected by MultiSelect
        const mappedTags = tags.map((tag) => ({
          label: tag.name, // Assuming each tag object has a `name` field
          value: tag.id, // Assuming each tag object has an `id` field
        }));

        setTagOptions(mappedTags); // Set the options for MultiSelect
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags(); // Call the fetch function on mount
  }, []);

  // Function to remove a selected tag
  const removeTag = (tagValue) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagValue));
  };

  // Function to handle collaborator state changes
  const handleCollaboratorChange = (index, field, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index][field] = value;
    setCollaborators(newCollaborators);
  };

  // Function to add a new collaborator row
  const addCollaborator = () => {
    setCollaborators([
      ...collaborators,
      { campus: "", department: "", name: "", departments: [], users: [] },
    ]);
  };

  // Function to remove a collaborator row
  const removeCollaborator = (index) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(newCollaborators);
  };

  const handleActivitiesChange = (index, field, value) => {
    console.log(value)
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  const handleNumberOfActivitiesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfActivities(value);

    if (value > activities.length) {
      const additionalActivities = Array.from(
        { length: value - activities.length },
        () => ({
          title: "",
          date: "",
          startTime: "",
          endTime: "",
        })
      );
      setActivities([...activities, ...additionalActivities]);
    } else {
      setActivities(activities.slice(0, value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activitiesData = activities.map((activity) => ({
      activity_title: activity.title,
      activity_description: activity.description,
      // activity_date: new Date(activity.date).toISOString(),
      start_date: new Date(activity.startDate).toISOString(),  // Convert to ISO string if required by the backend
      end_date: new Date(activity.endDate).toISOString(),
      start_time: activity.startTime,
      end_time: activity.endTime,
      venue: activity.venue, // Adjust according to the input
    }));
    const collaboratorsData = collaborators.map((collaborator) => ({
      location: collaborator.campus,
      department: collaborator.department,
      staffs: collaborator.users[0].id, // Assuming each collaborator has a single user assigned
    }));

    const requestData = {
      location_id: campus,
      department_id: department,
      event_title: eventTitle,
      description: description,
      no_of_activities: numberOfActivities,
      start_date: startDate, // Event-level start date
      end_date: endDate, // 
      // venue: venue,
      academic_year_id: academicYear,
      event_type_id: eventType,
      tags_id: tags.map((tag) => tag), // Adjust if needed
      activities_data: activitiesData,
      collaborators_data: collaboratorsData,
    };
    console.log(activitiesData)

    try {
      const response = await register_event(requestData);
      console.log(response);
      const eventId = response.data.id; // Extract event ID from response
      console.log(eventId);
      setSubmitted(true);

      // If files are selected, proceed to upload them
      if (files.length > 0) {
        await uploadFiles(eventId, files); // Call the file upload function
      }

      console.log("Event registered successfully");
      toast.success("Event registered successfully");
      // Handle success (show a success message or redirect)
      // Reset form fields
      setCampus("");
      setDepartment("");
      setEventTitle("");
      setNumberOfActivities("");
      setStartDate("");
      setEndDate("");
      setVenue("");
      setAcademicYear("");
      setEventType("");
      setTags([]);
      setActivities([]);
      setCollaborators([]);
      setFiles([]);
    } catch (error) {
      console.error("Error submitting the form", error);
      // Handle error (show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };
  const uploadFiles = async (eventId, files) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file); // Append each file to the form data
    });

    formData.append("event_id", eventId); // Append the event ID to the form data

    try {
      console.log(formData);
      const response = await proposal_file_upload(formData, eventId);

      console.log("Files uploaded successfully", response.data);
      // Handle success (e.g., show a success message or update the UI)
    } catch (error) {
      console.error("Error uploading files", error);
      // Handle error (e.g., show an error message)
    }
  };

  const renderAsterisk = () => <span style={{ color: "red" }}>*</span>;

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];

    // Validate if the file is a PDF
    if (newFile && newFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setFiles([...files, newFile]);
    setError(null); // Reset error if the file is valid
  };

  const handleAddFile = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-7 mt-1 pt-2 d-flex justify-content-center">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="text-center fw-bolder fs-5 mt-5">
              Event Registration Form
              <hr />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="campus" className="form-label">
                    Campus {renderAsterisk()}
                  </label>
                  <select
                    id="campus"
                    className="form-select"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)} // Update selected campus
                  >
                    <option value="" disabled>
                      Select Campus
                    </option>
                    {campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col">
                  <label htmlFor="department" className="form-label">
                    Department {renderAsterisk()}
                  </label>
                  <select
                    id="department"
                    className="form-select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)} // Update selected department
                    disabled={!campus} // Disable if no campus is selected
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Collaborators</label>
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    {/* Campus Dropdown */}
                    <div className="col">
                      <select
                        className="form-select"
                        value={collaborator.campus}
                        onChange={async (e) => {
                          const selectedCampus = e.target.value;
                          handleCollaboratorChange(
                            index,
                            "campus",
                            selectedCampus
                          );
                          // Fetch departments for the selected campus
                          const departments = await department_list_by_campus(
                            selectedCampus
                          );
                          handleCollaboratorChange(
                            index,
                            "departments",
                            departments
                          );
                        }}
                      >
                        <option value="" disabled>
                          Select Campus
                        </option>
                        {campuses.map((campus) => (
                          <option key={campus.id} value={campus.id}>
                            {campus.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Department Dropdown */}
                    <div className="col">
                      <select
                        className="form-select"
                        value={collaborator.department}
                        onChange={async (e) => {
                          const selectedDept = e.target.value;
                          handleCollaboratorChange(
                            index,
                            "department",
                            selectedDept
                          );
                          // Fetch users for the selected department
                          const response = await user_list_by_department(
                            selectedDept
                          );
                          const users = response.users; // Assuming `users` is the array from the response
                          handleCollaboratorChange(index, "users", users);
                        }}
                        disabled={!collaborator.campus} // Disable until a campus is selected
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {collaborator.departments &&
                          collaborator.departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Name (User) Dropdown */}
                    <div className="col">
                      <select
                        className="form-select"
                        value={collaborator.name}
                        onChange={(e) =>
                          handleCollaboratorChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!collaborator.department} // Disable until a department is selected
                      >
                        <option value="" disabled>
                          Select Name
                        </option>
                        {collaborator.users &&
                          collaborator.users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Add/Remove Buttons */}
                    <div className="col-auto">
                      <i
                        className="bi bi-plus-circle"
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={addCollaborator}
                      ></i>
                      {collaborators.length > 1 && (
                        <i
                          className="bi bi-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => removeCollaborator(index)}
                        ></i>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="eventTitle" className="form-label">
                  Event Title{renderAsterisk()}
                </label>
                <InputText
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                    // validateEventTitle(e.target.value);
                  }}
                  placeholder="Enter event title"
                  className={`w-100 ${eventTitleError ? "is-invalid" : ""}`} // Add invalid class if there's an error
                />
                {/* {eventTitleError && (
                    <div className="invalid-feedback">{eventTitleError}</div>
                  )} */}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description{renderAsterisk()}
                </label>
                <Editor
                  id="description"
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                  style={{ height: "150px" }}
                  placeholder="Enter description here..."
                />
              </div>

              {/* Start Date and End Date in one row */}
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="startDate" className="form-label">
                    Start Date{renderAsterisk()}
                  </label>
                  <InputText
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-100"
                  />
                </div>

                <div className="col">
                  <label htmlFor="endDate" className="form-label">
                    End Date{renderAsterisk()}
                  </label>
                  <InputText
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-100"
                  />
                </div>
              </div>



              <div className="mb-3">
                <label htmlFor="numberOfActivities" className="form-label">
                  Number of Activities{renderAsterisk()}
                </label>
                <InputText
                  id="numberOfActivities"
                  type="number"
                  value={numberOfActivities} // Ensure only positive numbers
                  onChange={handleNumberOfActivitiesChange}
                  className="w-100"
                  defaultValue={1}
                />
              </div>

              {activities.map((activity, index) => (
                <div key={index} className="mb-3">
                  <label
                    htmlFor={`activityTitle-${index}`}
                    className="form-label"
                  >
                    Activity {index + 1} Title {renderAsterisk()}
                  </label>
                  <InputText
                    id={`activityTitle-${index}`}
                    value={activity.title}
                    onChange={(e) =>
                      handleActivitiesChange(index, "title", e.target.value)
                    }
                    placeholder="Enter activity title"
                    className="w-100"
                  />
                  <div className="mt-3">
                    <label htmlFor={`activityDescription-${index}`} className="form-label">
                      Description {renderAsterisk()}
                    </label>
                    <Editor
                      id={`activityDescription-${index}`}
                      value={activity.description}
                      onTextChange={(e) =>
                        handleActivitiesChange(index, "description", e.htmlValue)
                      }
                      placeholder="Enter activity description"
                      className="w-100"
                      style={{ height: "100px" }}
                    />
                  </div>

                  <div className="row mt-3">
                    <div className="col">
                      <label
                        htmlFor={`startDate-${index}`}
                        className="form-label"
                      >
                        Start Date{renderAsterisk()}
                      </label>
                      <InputText
                        id={`startDate-${index}`}
                        type="date"
                        value={activity.startDate}
                        onChange={(e) =>
                          handleActivitiesChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-100"
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor={`endDate-${index}`}
                        className="form-label"
                      >
                        End Date{renderAsterisk()}
                      </label>
                      <InputText
                        id={`endDate-${index}`}
                        type="date"
                        value={activity.endDate}
                        onChange={(e) =>
                          handleActivitiesChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-100"
                      />
                    </div>
                  </div>



                  <div className="row mt-3">
                    <div className="col">
                      <label
                        htmlFor={`startTime-${index}`}
                        className="form-label"
                      >
                        Start Time{renderAsterisk()}
                      </label>
                      <InputText
                        id={`startTime-${index}`}
                        type="time"
                        value={activity.startTime}
                        onChange={(e) =>
                          handleActivitiesChange(
                            index,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="w-100"
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor={`endTime-${index}`}
                        className="form-label"
                      >
                        End Time{renderAsterisk()}
                      </label>
                      <InputText
                        id={`endTime-${index}`}
                        type="time"
                        value={activity.endTime}
                        onChange={(e) =>
                          handleActivitiesChange(
                            index,
                            "endTime",
                            e.target.value
                          )
                        }
                        className="w-100"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="venue" className="form-label">
                        Venue{renderAsterisk()}
                      </label>
                      <InputText
                        id="venue"
                        value={activity.venue}
                        onChange={(e) => handleActivitiesChange(
                          index,
                          "venue",
                          e.target.value
                        )
                        }
                        placeholder="Enter venue"
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Academic Year Dropdown */}
              <div className="mb-3">
                <label htmlFor="academicYear" className="form-label">
                  Academic Year{renderAsterisk()}
                </label>
                <Dropdown
                  id="academicYear"
                  value={academicYear}
                  options={academicYearOptions}
                  onChange={(e) => setAcademicYear(e.value)}
                  placeholder="Select academic year"
                  className="w-100"
                />
              </div>

              {/* Event Type Dropdown */}
              <div className="mb-3">
                <label htmlFor="eventType" className="form-label">
                  Event Type{renderAsterisk()}
                </label>
                <Dropdown
                  id="eventType"
                  value={eventType}
                  options={eventTypeOptions}
                  onChange={(e) => setEventType(e.value)}
                  placeholder="Select event type"
                  className="w-100"
                />
              </div>

              <div>
                <div className="mb-3">
                  <label htmlFor="proposal" className="form-label">
                    Upload Proposal{renderAsterisk()}
                  </label>
                  <div className="d-flex flex-wrap">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="file-box p-3 me-2 mb-2 border border-primary"
                      >
                        <span>{file.name}</span>
                      </div>
                    ))}
                    <div
                      className="file-box p-3 me-2 mb-2 border border-primary d-flex align-items-center justify-content-center"
                      onClick={handleAddFile}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="d-none"
                  />
                </div>
                {error && <div className="text-danger">{error}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>

                {/* MultiSelect for tag selection */}
                <MultiSelect
                  id="tags"
                  value={tags} // Selected tags
                  options={tagOptions} // Fetched options
                  onChange={(e) => setTags(e.value)} // Handle tag selection
                  placeholder="Select Tags"
                  className="w-100"
                  filter // Enable filter for searching tags
                />

                {/* Display selected tags as small boxes (chips) */}
                <div className="mt-2">
                  {tags.length > 0 && (
                    <div className="tag-boxes">
                      {tags.map((tagId) => {
                        // Find the corresponding tag name from tagOptions
                        const tag = tagOptions.find(
                          (option) => option.value === tagId
                        );
                        return (
                          <div key={tagId} className="tag-chip">
                            {tag.label}
                            <button

                              className="close-btn"
                              onClick={() => removeTag(tagId)}
                            >
                              &times; {/* Close button symbol */}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEvent;
