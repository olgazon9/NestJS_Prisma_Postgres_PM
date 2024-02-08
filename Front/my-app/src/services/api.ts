import axios from 'axios';

// Adjust the baseURL to point to your backend's address and port
const API = axios.create({
  baseURL: 'http://localhost:3000/', // Backend is running on port 3000
});

// Optionally, you can set up interceptors or headers here
// For example, setting up a common header if needed
// API.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default API;
