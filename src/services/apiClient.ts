import axios from 'axios';

// Create a reusable Axios instance with default configurations
const apiClient = axios.create({
  baseURL: '', // Base URL will be set in individual API services
  params: {}, // Default params will be added in individual API services
});

export default apiClient;