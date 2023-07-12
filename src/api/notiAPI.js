import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const notiAPI = {
  getList: () => {
    return axiosClient.get(URL.NOTI_URL);
  },
};
export default notiAPI;
