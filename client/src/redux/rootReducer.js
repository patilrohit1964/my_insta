import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice";
import postSlice from "./slicers/postSlice";
import authApi from "./api/authApi";
import postApi from "./api/postApi";
import socketSlice from "./slicers/socketSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  socket: socketSlice,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

export default rootReducer;
