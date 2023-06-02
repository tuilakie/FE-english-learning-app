import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const baseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Courses", "Levels", "Words"],
  endpoints: () => ({}),
});
