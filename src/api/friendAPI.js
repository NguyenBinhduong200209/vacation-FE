import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const friendAPI = {
  getFriendList: (page) => axiosClient.get(`${URL.FRIEND_ROUTE}?page=${page}`),
  getRequestList: (page) => axiosClient.get(`${URL.FRIEND_ROUTE}/resfriend?page=${page}`),
  acceptFriend: ({ friendRequestId, status }) =>
    axiosClient.put(URL.FRIEND_ROUTE, { friendRequestId, status }),
  removeFriend: (id) => axiosClient.delete(`${URL.FRIEND_ROUTE}/${id}`),
};
export default friendAPI;
