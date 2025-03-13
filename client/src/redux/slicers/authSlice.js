import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    suggestedUsers: [],
    userProfile: null,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setSuggestedUsers,
  setUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
