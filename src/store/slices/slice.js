import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
};

const slice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setImageUrl } = slice.actions;
export default slice.reducer;
