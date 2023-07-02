import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const locationAPI = {
  getTrendingPlace: (data) => {
    let url = `${URL.LOCATION_URL}?`;
    for (let key in data) {
      url += `${key}=${data[key]}&`;
    }
    return axiosClient.get(url);
  },
};

export default locationAPI;