// src/axios/index.js
import axios from "axios";
import homeURL from "./homeurl";

const baseURL = homeURL + "/api/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add console logs to check the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    // console.log('Access Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Headers:", config.headers); // Add this line
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}authentication/refresh`, {
          refresh: refreshToken,
        });

        localStorage.setItem('access_token', response.data.access);
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh);
        }

        instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        if (refreshError.response && refreshError.response.status === 401) {
          // Clear tokens and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';  // Redirect to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;