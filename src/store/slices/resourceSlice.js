import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

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
    msg: "",
    isLoading: false,
  },
  reducers: {
    resetResources: (state) => {
      state.resources = [];
    },
    deletImg: (state, action) => {
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
      });
  },
});
const { reducer, actions } = resourceSlice;
export const { resetResources } = actions;
export default reducer;
