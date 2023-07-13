import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const notiAPI = {
  getList: () => axiosClient.get(URL.GET_NOTI_URL),
  updateStatusAll: () => axiosClient.put(URL.UPDATE_ALL_NOTI_URL),
  updateStatusOne: (id) => axiosClient.put(`${URL.UPDATE_ONE_NOTI_URL}/${id}`),
};
export default notiAPI;
