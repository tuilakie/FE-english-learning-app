import { userSlice } from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { courseApi } from "./api/courseApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    userState: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, courseApi.middleware]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
