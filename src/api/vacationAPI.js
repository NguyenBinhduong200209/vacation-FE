import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const vacationAPI = {
  getListVacation: (data) => {
    const url = `${URL.VACATION_URL}?type=${data.type}&page=${data.page}`;
    return axiosClient.get(url);
  },
  getDetailVacation: (id) => {
    const url = `${URL.VACATION_URL}/${id}`;
    return axiosClient.get(url);
  },
  getManyPosts: (data) => {
    const url = `${URL.POST_URL}/${data.type}/${data.id}?page=${data.page}`;
    return axiosClient.get(url);
  },
  createPost: (data) => {
    return axiosClient.post(URL.POST_URL, data);
  }
}

export default vacationAPI;
