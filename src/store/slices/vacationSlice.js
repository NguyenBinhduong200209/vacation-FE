import statusAPI from "~/api/statusList";
import vacationAPI from "~/api/vacationAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getListVacation = createAsyncThunk(
  "vacation/getListVacation",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getListVacation(arg);
      return { result: res.data, currentPage: arg.page };
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


export const getDetailVacation = createAsyncThunk(
  "vacation/getDetailVacation",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getDetailVacation(arg);
      return res.data.data;
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


export const getManyPosts = createAsyncThunk(
  "vacation/getManyPosts",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getManyPosts(arg);
      // console.log(res);
      return res.data;
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue({ message: error.message })
      }
      return thunkAPI.rejectWithValue({
        message: error.response.data.message
      });
    }
  }
);

export const getMemberList = createAsyncThunk(
  "vacation/getMemberList",
  async (arg, thunkAPI) => {
    try {
      const res = await statusAPI.statusList(arg);
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
const vacationSlice = createSlice({
  name: "vacation",
  initialState: {
    listVacation: {
      list: [],
      page: 0,
      pages: 0,
    },
    detail: {},
    posts: {
      postList: [],
      meta: {},
    },
    activeTimeline: null,
    memberList: [],
    isLoading: false,
  },
  reducers: {
    setTimeline: (state, action) => {
      state.activeTimeline = action.payload;
    },
    resetList: (state, action) => {
      state.listVacation.list = [];
      state.listVacation.meta = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailVacation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailVacation.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.isLoading = false;
      })
      .addCase(getManyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManyPosts.fulfilled, (state, action) => {
        if (action.payload) {
          let newList = [];
          if (action.payload.data?.length > 0) {
            newList = state.posts.postList.concat(action.payload.data);
          }
          state.posts.postList = newList;
          state.posts.meta = action.payload.meta;
        }

        state.isLoading = false;
      })
      .addCase(getListVacation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListVacation.fulfilled, (state, action) => {
        const { data, meta } = action.payload.result;

        if (data && Array.isArray(data)) {
          const { page } = action.meta.arg;
          state.listVacation.list = page === 1 ? data : state.listVacation.list.concat(data);
          state.listVacation.page = meta?.page;
          state.listVacation.pages = meta?.pages;
        }

        state.isLoading = false;
      })
      .addCase(getListVacation.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.memberList = action.payload?.data;
      });
  },
});
const { reducer, actions } = vacationSlice;
export const { setTimeline, resetList } = actions;
export default reducer;
