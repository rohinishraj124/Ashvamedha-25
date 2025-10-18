import axios from 'axios';

// Create an instance of axios with a base URL.
// All requests made with this instance will automatically have this base URL prepended.
const apiClient = axios.create({
  baseURL: '/api', // This points to your Next.js API routes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
