import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", //this parameter is only for internal use
  initialState: {
    isAuthenticated: false,
    username: null,
    email: null,
    accessToken: null,
  },
  reducers: {
    //this state variable tht comes as argument in our action function is
    //the state of this particular slice

    addUser(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    removeUser(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
