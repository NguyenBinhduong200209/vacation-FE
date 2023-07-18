import albumAPI from "~/api/albumAPI";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getList = createAsyncThunk("album/getList", async (arg, thunkAPI) => {
  try {
    const res = await albumAPI.getList(arg?.page || 1);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

const albumSlice = createSlice({
  name: "album",
  initialState: {
    list: [],
    meta: { page: 1, pages: 1, total: 1 },
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        if (action.payload) {
          const {
            data,
            meta: { Page, Pages, totalAlbums },
          } = action.payload;
          state.isLoading = false;
          state.list = data?.length > 0 && state.list.concat(data);
          state.meta.page = Page;
          state.meta.pages = Pages;
          state.meta.total = totalAlbums;
        }
      })
      .addCase(getList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload?.message;
      });
  },
});
const { reducer, actions } = albumSlice;
export const { changeRenderList } = actions;
export default reducer;
