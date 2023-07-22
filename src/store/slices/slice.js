import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
  id: "",
};

const slice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      console.log(action);
      state.imageUrl = action.payload;
    },
  },
});

export const { setImageUrl } = slice.actions;
export default slice.reducer;
