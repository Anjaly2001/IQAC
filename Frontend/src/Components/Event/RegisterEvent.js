import React, { useState, useEffect , useRef} from "react";
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

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from "primereact/button";
        

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
  const stepperRef = useRef(null);
  // const [descriptionError, setDescriptionError] = useState(""); // Check if you're using setDescriptionError somewhere
  const [descriptionError] = useState("");



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
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center fw-bolder fs-5 mt-5">
            Event Registration Form
            <hr />
          </div>

          <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel header=" ">
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
                      onChange={(e) => setCampus(e.target.value)} 
                    >
                      <option value="" disabled>Select Campus</option>
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
                      onChange={(e) => setDepartment(e.target.value)} 
                      disabled={!campus} 
                    >
                      <option value="" disabled>Select Department</option>
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
                      <div className="col">
                        <select
                          className="form-select"
                          value={collaborator.campus}
                          onChange={async (e) => {
                            const selectedCampus = e.target.value;
                            handleCollaboratorChange(index, 'campus', selectedCampus);
                            const departments = await department_list_by_campus(selectedCampus);
                            handleCollaboratorChange(index, 'departments', departments);
                          }}
                        >
                          <option value="" disabled>Select Campus</option>
                          {campuses.map((campus) => (
                            <option key={campus.id} value={campus.id}>
                              {campus.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col">
                        <select
                          className="form-select"
                          value={collaborator.department}
                          onChange={async (e) => {
                            const selectedDept = e.target.value;
                            handleCollaboratorChange(index, 'department', selectedDept);
                            const response = await user_list_by_department(selectedDept);
                            const users = response.users;
                            handleCollaboratorChange(index, 'users', users);
                          }}
                          disabled={!collaborator.campus}
                        >
                          <option value="" disabled>Select Department</option>
                          {collaborator.departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col">
                        <select
                          className="form-select"
                          value={collaborator.name}
                          onChange={(e) => handleCollaboratorChange(index, 'name', e.target.value)}
                          disabled={!collaborator.department}
                        >
                          <option value="" disabled>Select Name</option>
                          {collaborator.users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.username}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-auto">
                        <i
                          className="bi bi-plus-circle"
                          style={{ cursor: 'pointer', marginRight: '10px' }}
                          onClick={addCollaborator}
                        />
                        {collaborators.length > 1 && (
                          <i
                            className="bi bi-trash"
                            style={{ cursor: 'pointer' }}
                            onClick={() => removeCollaborator(index)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">
                    Event Title {renderAsterisk()}
                  </label>
                  <InputText
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter event title"
                    className="w-100"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description {renderAsterisk()}
                  </label>
                  <Editor
                    id="description"
                    value={description}
                    onTextChange={(e) => setDescription(e.htmlValue)}
                    style={{ height: '150px' }}
                    placeholder="Enter description here..."
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="startDate" className="form-label">
                      Start Date {renderAsterisk()}
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
                      End Date {renderAsterisk()}
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
                    Number of Activities {renderAsterisk()}
                  </label>
                  <InputText
                    id="numberOfActivities"
                    type="number"
                    value={numberOfActivities}
                    onChange={handleNumberOfActivitiesChange}
                    min="1"
                    max="10"
                    className="w-100"
                  />
                </div>
              </form>
            </StepperPanel>
            
            <StepperPanel header=" ">
            {/* Dynamically render StepperPanel based on the number of activities */}
            {activities.map((activity, index) => (
                <StepperPanel key={index} header={`Activity ${index + 1} Details`}>
                  <div className="mb-3">
                    <label htmlFor={`activityTitle${index}`} className="form-label">
                      Activity Title {renderAsterisk()}
                    </label>
                    <InputText
                      id={`activityTitle${index}`}
                      value={activity.title}
                      onChange={(e) => handleActivitiesChange(index, 'title', e.target.value)}
                      placeholder="Enter activity title"
                      className="w-100"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor={`activityDescription${index}`} className="form-label">
                      Description {renderAsterisk()}
                    </label>
                    <Editor
                      id={`activityDescription${index}`}
                      value={activity.description}
                      onTextChange={(e) => handleActivitiesChange(index, 'description', e.htmlValue)}
                      style={{ height: '150px' }}
                      placeholder="Enter activity description here..."
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor={`activityStartDate${index}`} className="form-label">
                        Start Date {renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityStartDate${index}`}
                        type="date"
                        value={activity.startDate}
                        onChange={(e) => handleActivitiesChange(index, 'startDate', e.target.value)}
                        className="w-100"
                      />
                    </div>

                    <div className="col">
                      <label htmlFor={`activityEndDate${index}`} className="form-label">
                        End Date {renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityEndDate${index}`}
                        type="date"
                        value={activity.endDate}
                        onChange={(e) => handleActivitiesChange(index, 'endDate', e.target.value)}
                        className="w-100"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor={`activityStartTime${index}`} className="form-label">
                        Start Time {renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityStartTime${index}`}
                        type="time"
                        value={activity.startTime}
                        onChange={(e) => handleActivitiesChange(index, 'startTime', e.target.value)}
                        className="w-100"
                      />
                    </div>

                    <div className="col">
                      <label htmlFor={`activityEndTime${index}`} className="form-label">
                        End Time {renderAsterisk()}
                      </label>
                      <InputText
                        id={`activityEndTime${index}`}
                        type="time"
                        value={activity.endTime}
                        onChange={(e) => handleActivitiesChange(index, 'endTime', e.target.value)}
                        className="w-100"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor={`activityVenue${index}`} className="form-label">
                      Venue {renderAsterisk()}
                    </label>
                    <InputText
                      id={`activityVenue${index}`}
                      value={activity.venue}
                      onChange={(e) => handleActivitiesChange(index, 'venue', e.target.value)}
                      placeholder="Enter activity venue"
                      className="w-100"
                    />
                  </div>
                  </StepperPanel>
              ))}

              {/* Add more steps as needed */}
              </StepperPanel>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default RegisterEvent;
