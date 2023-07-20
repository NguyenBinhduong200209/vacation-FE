import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const albumAPI = {
  getList: (data) => {
    const url = ["page", "userId"].reduce(
      (str, item) => (data[item] ? str.concat(`${item}=${data[item]}&`) : str),
      `${URL.VACATION_URL}?`
    );
    return axiosClient.get(url);
  },
};
export default albumAPI;
