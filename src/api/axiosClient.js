// api/axiosClient.js
import axios from "axios";
import jwtDecode from "jwt-decode";
import authAPI from "./authAPI";

// Set up default config for http requests here
// export const source = axios.CancelToken.source();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 20000,
});
axiosClient.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
