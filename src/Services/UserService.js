import axios from 'axios';

const API_URL = '/api/users';

const getAllUsers = () => {
    return axios.get(API_URL);
};

const createUser = (user) => {
    return axios.post(API_URL, user);
};

const updateUser = (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
