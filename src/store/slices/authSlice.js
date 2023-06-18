import authAPI from "~/api/authAPI";
import { LoginData } from "~/modules/auth/components/config/data";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const handleAuth = createAsyncThunk(
  "auth/handleAuth",
  async (arg, thunkAPI) => {
    try {
      let res = await authAPI[arg.type](arg.data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    renderList: [{ list: LoginData }],
    isLogin: !!localStorage.getItem("token"),
    isLoading: false,
  },
  reducers: {
    changeRenderList: (state, action) => {
      if (action.payload.type === "ADD") {
        state.renderList.push(action.payload.data);
      } else if (action.payload.type === "BACK") {
        const newList = state.renderList.slice(0, state.renderList.length - 1);
        return {
          ...state,
          renderList: newList,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;

        if (action.payload) {
          localStorage.setItem(
            "token",
            `Bearer ${action.payload.data.accessToken}`
          );
        }
      });
  },
});
const { reducer, actions } = authSlice;
export const { changeRenderList } = actions;
export default reducer;
