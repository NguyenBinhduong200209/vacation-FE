import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const albumAPI = {
  getList: (data) => {
    const url = ["page", "userId"].reduce(
      (str, item) => (data[item] ? str.concat(`${item}=${data[item]}&`) : str),
      `${URL.ALBUM_ROUTE}?`
    );
    return axiosClient.get(url);
  },

  getAlbumPage: (data) => {
    const url = `${URL.ALBUMPAGE_ROUTE}/${data.albumId}?page=${data.page}`;
    return axiosClient.get(url);
  },

  delete: (id) => axiosClient.delete(`${URL.ALBUM_ROUTE}/${id}`),
};
export default albumAPI;
