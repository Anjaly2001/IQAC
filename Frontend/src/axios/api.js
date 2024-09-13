import axiosInstance from "./index"; // Your Axios instance
import { postMultipartData, updateMultipartData } from "./utils";


// lOGIN API ARGUMENT as form elements
export const login = async (form) => {
  try {
    const res = await axiosInstance.post(
      "authentication/login_with_email",
      form
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const verify_otp = async (form) => {
  try {
    const res = await axiosInstance.post("authentication/verify_otp", form);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const campus_register = async (form) => {
  try {
    const res = await postMultipartData(
      "department_and_events/campus_register/",
      form
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("campus already exist.");
  }
};

export const campus_list = async (form) => {
  try {
    const res = await await axiosInstance.get(
      "department_and_events/campus_list/"
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create campus. Please try again.");
  }
};

export const campus_update = async (campus_id, updatedCampusData) => {
  try {
    const res = await updateMultipartData(
      `department_and_events/campus_update/${campus_id}/`,
      updatedCampusData
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("campus already exist.");
  }
};

export const campus_delete = async (campus_id) => {
  try {
    const res = await axiosInstance.delete(
      `department_and_events/campus_delete/${campus_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
   
  }
};

export const department_register = async (form) => {
  try {
    const res = await axiosInstance.post(
      "department_and_events/department_register/",
      form
    );
    return res.data;
  } catch (error) {
    console.log(error);
   
  }
};

export const department_list_by_campus = async (campus_id) => {
  try {
    const res = await axiosInstance.get(
      `department_and_events/department_list_by_campus/${campus_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const department_list = async (form) => {
  try {
    const res = await axiosInstance.get(
      `department_and_events/department_list/`,
      form
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const department_delete = async (department_id) => {
  try {
    const res = await axiosInstance.delete(
      `department_and_events/department_delete/${department_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const department_active = async (department_id) => {
  try {
    const res = await axiosInstance.post(
      `department_and_events/department_activation/${department_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const department_update = async (department_id) => {
//   try {
//     const res = await axiosInstance.post(`department_and_events/department_update/${department_id}/`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     // toast.error('Failed to delete department. Please try again.');
//   }
// };

export const user_register = async (form) => {
  try {
    const res = await axiosInstance.post("authentication/register", form);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const multiple_user_register = async (form) => {
  try {
    const res = await postMultipartData(
      "authentication/multiple_user_registration/",
      form
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const users_list = async (form) => {
  try {
    const res = await axiosInstance.get("authentication/user_list/", form);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const user_active = async (user_id) => {
  try {
    const res = await axiosInstance.post(
      `authentication/user_deactivate/${user_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const user_delete = async (department_id) => {
  try {
    const res = await axiosInstance.delete(
      `authentication/user_delete/${department_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const user_update = async (user_id) => {
//   try {
//     const res = await axiosInstance.put(`authentication/user_deactivate/${user_id}/`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     // toast.error('Failed to activate user. Please try again.');
//   }
// };

export const academic_register = async (form) => {
  try {
    const res = await axiosInstance.post(
      "department_and_events/create_academic_year/",
      form
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create academic year. Please try again.");
  }
};

export const academic_list = async () => {
  try {
    const res = await axiosInstance.get(
      "department_and_events/list_academic_year/"
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create academic year. Please try again.");
  }
};
export const academic_list_campus = async (campus_id) => {
  try {
    const res = await axiosInstance.get(
      `department_and_events/list_academic_year_by_campus/${campus_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to Fetch academic year. Please try again.");
  }
};
export const academic_delete = async (academicYearId) => {
  try {
    const res = await axiosInstance.delete(
      `department_and_events/delete_academic_year/${academicYearId}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to delete academic year. Please try again.");
  }
};

export const event_type_register = async (data) => {
  try {
    const res = await axiosInstance.post("department_and_events/create_event_type/",data);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create academic year. Please try again.");
  }
};

export const event_type_list = async () => {
  try {
    const res = await axiosInstance.get(
      "department_and_events/list_event_type/",
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list event types. Please try again.");
  }
};

export const event_type_delete = async (eventType) => {
  try {
    const res = await axiosInstance.delete(
      `department_and_events/delete_event_type/${eventType}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // // toast.error('Failed to delete user. Please try again.');
  }
};

// role

export const campus_name_list = async (form) => {
  try {
    const res = await axiosInstance.get(
      "department_and_events/campus_name_list/",
      form
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list event types. Please try again.");
  }
};

export const user_list_by_department = async (department_id) => {
  try {
    const res = await axiosInstance.get(
      `department_and_events/users_list_of_each_department/${department_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list event types. Please try again.");
  }
};

export const user_department_role = async (user_id)=>{
  try {
    const res = await axiosInstance.get(
      `department_and_events/roles_and_department_of_each_user/${user_id}/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list event types. Please try again.");
  }
};

export const assignUserRole = async (roleData) => {
  try {
    const response = await axiosInstance.post("department_and_events/assign_role/", roleData); // Replace with your actual API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Axios or Fetch API call to delete a user's role
export const deleteUserRole = async (roleId) => {
  try {
    const response = await axiosInstance.delete(`/department_and_events/delete_role/${roleId}/`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting role");
  }
};

//tags
export const create_tag = async (form) => {
  try {
    const res = await axiosInstance.post( "department_and_events/create_tag/",form);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create tag. Please try again.");
  }
};


export const list_tags = async () => {
  try {
    const res = await axiosInstance.get("department_and_events/list_tag/",);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list tags. Please try again.");
  }
};

export const delete_tag = async (tag_id) => {
  try {
    const res = await axiosInstance.delete( `department_and_events/delete_tag/${tag_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to delete tag. Please try again.");
  }
};

export const register_event=async(form)=>{
  try {
    const res = await axiosInstance.post("department_and_events/event_register/", form);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create event. Please try again.");
  }
};

// propsal_file_upload
export const proposal_file_upload=async(form,event_id)=>{
  try {
    const res = await postMultipartData(`department_and_events/upload_proposal_files/${event_id}/`, form);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to create proposal file. Please try again.");
  }
};

export const event_list= async () => {
  try {
    const res = await axiosInstance.get( "department_and_events/event_list/",);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error("Failed to list event types. Please try again.");
  }
};


export const event_delete = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/department_and_events/event_delete/${eventId}/`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting role");
  }
};