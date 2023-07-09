import vacationAPI from "~/api/vacationAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getListVacation = createAsyncThunk(
  "vacation/getListVacation",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getListVacation(arg);
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log("error:", error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

export const getDetailVacation = createAsyncThunk(
  "vacation/getDetailVacation",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getDetailVacation(arg);
      // console.log(res);
      return res.data.data;
    } catch (error) {
      console.log("error:", error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

export const getManyPosts = createAsyncThunk(
  "vacation/getManyPosts",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getManyPosts(arg);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log("error:", error);

      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

const vacationSlice = createSlice({
  name: "vacation",
  initialState: {
    listVacation: {
      list: [],
      meta: {},
    },
    detail: {},
    posts: {
      postList: [],
      meta: {},
    },
    activeTimeline: null,
    isLoading: false,
  },
  reducers: {
    setTimeline: (state, action) => {
      state.activeTimeline = action.payload;
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
        console.log(action.payload);
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
        state.isLoading = false;
      })
      .addCase(getListVacation.fulfilled, (state, action) => {
        // console.log(action.payload);

        if (action.payload) {
          let newList = [];
          if (action.payload.data?.length > 0) {
            newList = state.listVacation.list.concat(action.payload.data);
          }
          state.listVacation.list = newList;
          state.listVacation.meta = action.payload?.meta;
        }

        state.isLoading = false;
      });
  },
});
const { reducer, actions } = vacationSlice;
export const { setTimeline } = actions;
export default reducer;
