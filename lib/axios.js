import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Create an instance of axios with a base URL.
const apiClient = axios.create({
  baseURL: '/api', // This points to your Next.js API routes
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Read the accessToken from cookies
    const token = Cookies.get('accessToken'); // Make sure the cookie name matches what you set in loginContextProvider

    // If the token exists, add the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default apiClient;