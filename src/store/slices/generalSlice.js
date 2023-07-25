const { createSlice } = require("@reduxjs/toolkit");

const generalSlice = createSlice({
  name: "general",
  initialState: {
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  reducers: {
    updateSize: (state, action) => {
      state.size = action.payload;
    },
  },
});
const { reducer, actions } = generalSlice;
export const { updateSize } = actions;
export default reducer;
