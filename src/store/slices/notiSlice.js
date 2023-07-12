import notiAPI from "~/api/notiAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("notification/getList", async (arg, thunkAPI) => {
  try {
    const res = await notiAPI.getList();
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
  }
});

const notiSlice = createSlice({
  name: "notification",
  initialState: {
    isVisible: false,
    list: [],
    isLoading: true,
  },
  reducers: {
    changeVisible: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        action.payload && (state.list = action.payload);
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = notiSlice;
export const { changeVisible } = actions;
export default reducer;
