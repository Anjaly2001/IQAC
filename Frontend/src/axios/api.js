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
    return res.data;
  }
  catch (error) {
    console.log(error);
    toast.error('Failed to create campus. Please try again.');
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
    toast.error('Failed to delete department. Please try again.');
  }
};
