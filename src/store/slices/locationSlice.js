import locationAPI from "~/api/locationAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getTrendingPlace = createAsyncThunk(
  "location/getTrendingPlace",
  async (arg, thunkAPI) => {
    try {
      const res = await locationAPI.getTrendingPlace(arg);
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

export const getManyLocations = createAsyncThunk(
  "location/getManyLocations",
  async (arg, thunkAPI) => {
    try {
      const res = await locationAPI.getManyLocations(arg);
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

const locationSlice = createSlice({
  name: "location",
  initialState: {
    trendingList: [],
    locationList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingPlace.fulfilled, (state, action) => {
        state.trendingList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getManyLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManyLocations.fulfilled, (state, action) => {
        state.locationList = action.payload;
      });
  },
});
const { reducer, actions } = locationSlice;
export const { } = actions;
export default reducer;
