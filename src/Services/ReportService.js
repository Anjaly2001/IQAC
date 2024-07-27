import axios from 'axios';

const API_URL = '/api/reports';

const getApprovedReports = () => {
    return axios.get(`${API_URL}/approved`);
};

const getPendingReports = () => {
    return axios.get(`${API_URL}/pending`);
};

const approveReport = (id) => {
    return axios.post(`${API_URL}/${id}/approve`);
};

const rejectReport = (id) => {
    return axios.post(`${API_URL}/${id}/reject`);
};

const addComment = (id, comment) => {
    return axios.post(`${API_URL}/${id}/comment`, { comment });
};

export default {
    getApprovedReports,
    getPendingReports,
    approveReport,
    rejectReport,
    addComment
};
