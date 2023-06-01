import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { Level } from "./types";

export const levelApi = createApi({
  reducerPath: "levelApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLevels: builder.query<Level[], string>({
      query: (courseId) => ({
        url: `course/${courseId}/level`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLevelsQuery } = levelApi;
