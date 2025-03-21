import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
