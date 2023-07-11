import searchAPI from "~/api/searchAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const searchOneModel = createAsyncThunk(
  "search/searchOneModel",
  async (arg, thunkAPI) => {
    const res = await searchAPI.searchOneModel(arg);
    console.log(res);
    return res.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    result: [],
    pages: 0,
    isLoading: false,
  },
  reducers: {
    resetResult: (state, action) => {
      state.result = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchOneModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchOneModel.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload !== "") {
          let newList = state.result.concat(action.payload.data);
          state.result = newList;
          state.pages = action.payload.meta.pages;
        }
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = searchSlice;
export const { resetResult } = actions;
export default reducer;
