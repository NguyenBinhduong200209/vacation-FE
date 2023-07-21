import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const friendAPI = {
  getFriendList: (page) => axiosClient.get(`${URL.FRIEND_ROUTE}?page=${page}`),
  getRequestList: (page) => axiosClient.get(`${URL.FRIEND_ROUTE}/requestList?page=${page}`),
  addFriend: (id) => axiosClient.post(`${URL.FRIEND_ROUTE}/${id}`),
  acceptFriend: (id) => axiosClient.put(`${URL.FRIEND_ROUTE}/${id}`),
  removeFriend: (id) => axiosClient.delete(`${URL.FRIEND_ROUTE}/${id}`),
};
export default friendAPI;
