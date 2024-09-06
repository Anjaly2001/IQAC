import axiosInstance from './index'; // Your Axios instance
import { postMultipartData } from './utils';
import { toast } from 'react-toastify';


// lOGIN API ARGUMENT as form elements
export const login = async (form) => {
  try {
    const res = await axiosInstance.post('authentication/login_with_email', form);
    return res.data;
  }
  catch (error) {
    return null;
  }
};


export const verify_otp = async (form) => {
  try {
    const res = await axiosInstance.post('authentication/verify_otp', form);
    return res.data;
  }
  catch (error) {
    return null;
  }
};

export const campus_register = async (form) => {
  try {
    const res = await postMultipartData('department_and_events/campus_register/', form);
    // toast.success('campus created Successfully')
    return res.data;
    
  }
  catch (error) {
    console.log(error);
    toast.error('campus already exist.');
  }
};

export const campus_list = async (form) => {
  try {
    const res = await await axiosInstance.get('department_and_events/campus_list/');
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create campus. Please try again.');
  }
};

export const campus_delete = async (campus_id) => {
  try {
    const res = await axiosInstance.delete(`authentication/user_delete/${campus_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error('Failed to delete campus. Please try again.');
  }
};


export const department_register = async (form) => {
  try {
    const res = await axiosInstance.post('department_and_events/department_register/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create department. Please try again.');
  }
};


export const department_list = async (form) => {
  try {
    const res = await axiosInstance.get('department_and_events/department_list/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create department. Please try again.');
  }
};

export const department_delete = async (department_id) => {
  try {
    const res = await axiosInstance.delete(`department_and_events/department_delete/${department_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete department. Please try again.');
  }
};

export const department_active = async (department_id) => {
  try {
    const res = await axiosInstance.post(`department_and_events/department_activation/${department_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to activate department. Please try again.');
  }
};


// export const department_update = async (department_id) => {
//   try {
//     const res = await axiosInstance.post(`department_and_events/department_update/${department_id}/`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     toast.error('Failed to delete department. Please try again.');
//   }
// };

export const user_register = async (form) => {
  try {
    const res = await axiosInstance.post('authentication/register', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create department. Please try again.');
  }
};

export const multiple_user_register = async (form) => {
  try {
    const res = await postMultipartData('authentication/multiple_user_registration/', form);
    return res;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to register users. Please try again.');
  }
};

export const users_list= async (form) => {
  try {
    const res = await axiosInstance.get('authentication/user_list/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create department. Please try again.');
  }
};

export const user_active = async (user_id) => {
  try {
    const res = await axiosInstance.post(`authentication/user_deactivate/${user_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to activate user. Please try again.');
  }
};

export const user_delete = async (department_id) => {
  try {
    const res = await axiosInstance.delete(`authentication/user_delete/${department_id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete user. Please try again.');
  }
};

export const academic_register = async (form) => {
  try {
    const res = await axiosInstance.post('department_and_events/create_academic_year/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create academic year. Please try again.');
  }
};

export const academic_list= async (form) => {
  try {
    const res = await axiosInstance.get('department_and_events/list_academic_year/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create academic year. Please try again.');
  }
};

export const academic_delete = async (academicYearId) => {
  try {
    const res = await axiosInstance.delete(`department_and_events/delete_academic_year/${academicYearId}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete academic year. Please try again.');
  }
};

export const event_type_register = async (form) => {
  try {
    const res = await axiosInstance.post('department_and_events/create_event_type/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create academic year. Please try again.');
  }
};


export const event_type_list= async (form) => {
  try {
    const res = await axiosInstance.get('department_and_events/list_event_type/', form);
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to list event types. Please try again.');
  }
};

export const event_type_delete = async (eventType) => {
  try {
    const res = await axiosInstance.delete(`department_and_events/delete_event_type/${eventType}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error('Failed to delete user. Please try again.');
  }
};