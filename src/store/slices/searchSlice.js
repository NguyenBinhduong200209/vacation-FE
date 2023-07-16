import searchAPI from "~/api/searchAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const searchOneModel = createAsyncThunk("search/searchOneModel", async (arg, thunkAPI) => {
  const res = await searchAPI.searchOneModel(arg);
  return { data: res.data, status: res.status };
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    result: [],
    page: 0,
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
        //Destruture meta and payload of action
        const { page } = action.meta.arg;
        const {
          data: { data, meta },
          status,
        } = action.payload;

        //If page query of meta does not change and is 1, meaning user want to search one more time with nearly the same condition, if response status is 204 then reset result state, else set result state is response data
        //If page query of meta change, meaning user want to get more data with the same condition, if response status is 204, then does not update result state, else, set result state is prev state concat response data
        state.result =
          page === 1 ? (status === 204 ? [] : data) : status !== 204 && state.result.concat(data);

        //If response return page and pages, update page and pages state
        meta?.page && (state.page = meta?.page);
        meta?.pages && (state.pages = meta?.pages);

        state.isLoading = false;
      });
  },
});
const { reducer, actions } = searchSlice;
export const { resetResult } = actions;
export default reducer;
