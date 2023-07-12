import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vacationReducer from "./slices/vacationSlice";
import locationReducer from "./slices/locationSlice";
import searchReducer from "./slices/searchSlice";
import notiReducer from "./slices/notiSlice";

const rootReducer = {
  auth: authReducer,
  vacation: vacationReducer,
  location: locationReducer,
  search: searchReducer,
  noti: notiReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
