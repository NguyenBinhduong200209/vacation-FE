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

export const updateOne = createAsyncThunk("notification/updateOne", async (id, thunkAPI) => {
  try {
    const res = await notiAPI.updateStatusOne(id);
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
  }
});

const notiSlice = createSlice({
  name: "notification",
  initialState: {
    isVisible: false,
    quantity: 0,
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
        if (action.payload) {
          state.list = action.payload;
          state.quantity = action.payload.filter((item) => item.isSeen === false).length;
          state.isLoading = false;
        }
      })
      .addCase(getList.rejected, (state) => {
        state.isLoading = false;
        state.list = [];
        state.quantity = 0;
      })
      .addCase(updateOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = notiSlice;
export const { changeVisible } = actions;
export default reducer;
