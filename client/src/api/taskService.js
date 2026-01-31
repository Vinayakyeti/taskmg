import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Get token from localStorage
const getToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user).token;
    }
    return null;
};

// Create config with auth header
const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Create tasks
export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData, getConfig());
    return response.data;
};

// Get all tasks
export const getTasks = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
    const response = await axios.put(`${API_URL}/${id}`, taskData, getConfig());
    return response.data;
};

// Delete task
export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getConfig());
    return response.data;
};
