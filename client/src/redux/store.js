import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "./api/authApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { setupListeners } from "@reduxjs/toolkit/query";
import postApi from "./api/postApi";
import chatApi from "./api/messageApi";

const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage engine (localStorage by default)
  whitelist: ["auth", "post"], //make sure this match with our rootreducer and slice reducer means always check rootreducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, postApi.middleware, chatApi.middleware),
});

const persistor = persistStore(appStore);
setupListeners(appStore.dispatch);
export { appStore, persistor };
