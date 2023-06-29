import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vacationReducer from "./slices/vacationSlice";
import locationReducer from "./slices/locationSlice";

const rootReducer = {
  auth: authReducer,
  vacation: vacationReducer,
  location: locationReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
