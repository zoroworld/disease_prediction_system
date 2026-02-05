// base.js
import axios from "axios";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

// in-memory access token
let accessToken = null;

// Create Axios instance
const base = axios.create({
  baseURL: VITE_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token to all requests
base.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: handle 401 and refresh access token automatically
base.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Try refreshing the access token
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const res = await axios.post(`${VITE_API_KEY}/token/refresh/`, {
            refresh: refreshToken,
          });
          accessToken = res.data.access;

          // Retry the original request with new access token
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;
          return base(error.config);
        } catch (err) {
          // Refresh failed → redirect to login
          window.location.href = "/login";
          return Promise.reject(err);
        }
      } else {
        // No refresh token → redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Helper to set access token after login
export const setAccessToken = (token) => {
  accessToken = token;
};

export default base;
