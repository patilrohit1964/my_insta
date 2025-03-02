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

const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage engine (localStorage by default)
  whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const appStore = configureStore({
  reducer: {
    persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

const persistor = persistStore(appStore);
setupListeners(appStore.dispatch);
export { appStore, persistor };
