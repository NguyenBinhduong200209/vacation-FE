// api/axiosClient.js
import axios from "axios";
import jwtDecode from "jwt-decode";
import authAPI from "./authAPI";

// Set up default config for http requests here
// export const source = axios.CancelToken.source();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // cancelToken: source.token,
  headers: {
    "content-type": "application/json",
  },
  timeout: 20000,
});
axiosClient.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  let date = new Date();
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken < date.getTime() / 1000) {
      const res = await authAPI.refreshToken();
      localStorage.setItem("token", `Bearer ${res.data.accessToken}`);
      config.headers.Authorization = `Bearer ${res.data.accessToken}`;
    } else {
      config.headers.Authorization = token;
    }
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
