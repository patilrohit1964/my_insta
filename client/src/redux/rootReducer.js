import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice";
import authApi from "./api/authApi";

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
