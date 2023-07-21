import resourceAPI from "~/api/resourceAPI";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAvatar = createAsyncThunk("resource/getAvatar", async (arg, thunkAPI) => {
  try {
    const res = await resourceAPI.getAvatar({ page: arg?.page, userId: arg?.userId });
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

const resourceSlice = createSlice({
  name: "resource",
  initialState: {
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
  },
  extraReducers: (builder) => {
    builder
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
export const { resetList } = actions;
export default reducer;
