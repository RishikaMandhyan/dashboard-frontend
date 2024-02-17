import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toasts",
  initialState: {
    toasts: [],
  },

  reducers: {
    addToast(state, action) {
      const newToast = {
        id: action.payload.id,
        message: action.payload.message,
        type: action.payload.type,
      };

      state.toasts.push(newToast);
    },

    removeToast(state, action) {
      state.toasts = state.toasts.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
