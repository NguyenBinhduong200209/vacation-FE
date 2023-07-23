import albumAPI from "~/api/albumAPI";
const { createSlice, createAsyncThunk, current } = require("@reduxjs/toolkit");

export const getList = createAsyncThunk("album/getList", async (arg, thunkAPI) => {
  try {
    const res = await albumAPI.getList({ userId: arg?.userId, page: arg?.page || 1 });
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
    selectedImages: [],
    meta: { page: 1, pages: 1, total: 1 },
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {
    resetList: (state, action) => {
      state.list = [];
      state.meta = { page: 1, pages: 1, total: 1 };
    },
    addSelected: (state, action) => {
      const currentSelectedList = current(state).selectedImages;
      state.selectedImages = currentSelectedList.concat(
        Object.assign({ style: { width: 100, height: 100, top: 0, left: 0 } }, action.payload)
      );
    },
    updateSelected: (state, action) => {
      const currentSelectedList = current(state).selectedImages;
      const index = currentSelectedList.findIndex((item) => item._id === action.payload._id);
      state.selectedImages = currentSelectedList.toSpliced(index, 1, action.payload);
    },
    removeSelected: (state, action) => {
      const currentSelectedList = current(state).selectedImages;
      state.selectedImages = currentSelectedList.filter((image) => image._id !== action.payload);
    },
  },
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
          state.list = Page === 1 ? data : data?.length > 0 && state.list.concat(data);
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
export const { resetList, addSelected, removeSelected, updateSelected } = actions;
export default reducer;
