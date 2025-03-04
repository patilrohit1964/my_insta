import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice";
import postSlice from "./slicers/postSlice";
import authApi from "./api/authApi";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
