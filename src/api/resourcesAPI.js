import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const resourcesAPI = {
  uploadFile: (data) => {
    return axiosClient.post(URL.RESOURCE_URL, data);
  },
};

export default resourcesAPI;
