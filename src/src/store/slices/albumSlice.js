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

export const getAlbumPage = createAsyncThunk("album/getAlbumPage", async (arg, thunkAPI) => {
  try {
    const res = await albumAPI.getAlbumPage({ albumId: arg?.albumId, page: arg?.page || 1 });
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

export const deleteAlbum = createAsyncThunk("album/delete", async (arg, thunkAPI) => {
  try {
    const { id } = arg;
    const res = await albumAPI.delete(id);
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
    selectedPageId: "",
    meta: { page: 1, pages: 1, total: 1 },
    isLoading: false,
    isError: false,
    msg: "",
    userId: ""
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
          const { data, meta } = action.payload;
          state.isLoading = false;
          if (data?.length > 0) {
            state.list = meta.page === 1 ? data : state.list.concat(data);
          }
          state.meta = meta;
        }
      })
      .addCase(getList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload?.message;
      })
      .addCase(getAlbumPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlbumPage.fulfilled, (state, action) => {
        const { resource, _id, userId } = action.payload?.data;
        state.selectedImages = resource.map(item => Object.assign({ path: item.path, style: item.style, _id: item.resourceId }))
        state.selectedPageId = _id
        state.isLoading = false;
        state.userId = userId
      })
      .addCase(getAlbumPage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload?.message;
      })
      .addCase(deleteAlbum.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        const currentList = current(state).list;
        state.list = currentList.filter((item) => item._id !== action.meta.arg.id);
        state.isLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload?.message;
      });
  },
});
const { reducer, actions } = albumSlice;
export const { resetList, addSelected, removeSelected, updateSelected } = actions;
export default reducer;
