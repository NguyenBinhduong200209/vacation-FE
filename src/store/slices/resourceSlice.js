import axios from "axios";
import resourcesAPI from "~/api/resourcesAPI";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAvatar = createAsyncThunk(
  "resource/getAvatar",
  async (arg, thunkAPI) => {
    try {
      const res = await resourcesAPI.getAvatar({
        page: arg?.page,
        userId: arg?.userId,
      });
      return res.data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

export const uploadResource = createAsyncThunk(
  "uploadResource/resource",
  async (arg, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://vacation-backend.onrender.com/resource",
        arg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    resources: [],
    list: [],
    meta: { page: 1, pages: 1, total: 1 },
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {
    resetList: (state, action) => {
      state.list = [];
    },
    resetResources: (state) => {
      state.resources = [];
    },
    deleteImg: (state, action) => {
      const newList = state.filter((item) => item._id === action.payload);
      state.resources = newList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadResource.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.resources = state.resources.concat(data);
        }
        state.isLoading = false;
      })
      .addCase(uploadResource.rejected, (state, action) => {
        state.msg = action.payload?.message;
        state.isLoading = false;
      })
      .addCase(getAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        if (action.payload) {
          const {
            data,
            meta: { page, pages, total },
          } = action.payload;

          if (data.length > 0) {
            state.list = page === 1 ? data : state.list.concat(data);
          }
          state.meta.page = page;
          state.meta.pages = pages;
          state.meta.total = total;
        }
        state.isLoading = false;
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.list = [];
        state.msg = action.payload?.message;
      });
  },
});
const { reducer, actions } = resourceSlice;
export const { resetList, resetResources, deleteImg } = actions;
export default reducer;
