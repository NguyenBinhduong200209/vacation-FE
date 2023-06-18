import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const authAPI = {
  login: (account) => {
    return axiosClient.post(URL.LOGIN_URL, account);
  },

  logout: () => {
    return axiosClient.post(URL.LOGOUT_URL);
  },

  updateUser: (info) => {
    console.log(info);
    return axiosClient.put(URL.UPDATE_USER_URL, info);
  },

  register: (info) => {
    return axiosClient.post(URL.REGISTER_URL, info);
  },
  forgotPassword: (data) => {
    const url = `${URL.FORGOT_URL}/${data.email}`;
    return axiosClient.post(url);
  },
  resetPassword: (data) => {
    return axiosClient.put(URL.RESET_URL, data);
  },
};
export default authAPI;
