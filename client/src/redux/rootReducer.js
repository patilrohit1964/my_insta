import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice";
import postSlice from "./slicers/postSlice";
import authApi from "./api/authApi";
import postApi from "./api/postApi";
import socketSlice from "./slicers/socketSlice";
import chatSlice from "./slicers/chatSlice";
import chatApi from "./api/messageApi";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  socket: socketSlice,
  chat: chatSlice,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export default rootReducer;
