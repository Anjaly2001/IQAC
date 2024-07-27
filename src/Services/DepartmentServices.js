import axios from 'axios';

const API_URL = '/api/departments';

const getAllDepartments = () => {
    return axios.get(API_URL);
};

const createDepartment = (department) => {
    return axios.post(API_URL, department);
};

const updateDepartment = (id, department) => {
    return axios.put(`${API_URL}/${id}`, department);
};

const deleteDepartment = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
};
