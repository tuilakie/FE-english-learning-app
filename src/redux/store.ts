import { userSlice } from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { courseApi } from "./api/courseApi";
import { levelApi } from "./api/levelApi";
import { breadcrumbSlice } from "./features/breadcrumbSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
    userState: userSlice.reducer,
    breadcrumbState: breadcrumbSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      courseApi.middleware,
      levelApi.middleware,
    ]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
