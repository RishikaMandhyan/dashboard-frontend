import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastReducer from "./toastSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    toasts: toastReducer,
  },
});

export default store;
