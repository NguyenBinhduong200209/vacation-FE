import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const albumAPI = {
  getList: (page) => axiosClient.get(`${URL.ALBUM_ROUTE}?page=${page}`),
};
export default albumAPI;
