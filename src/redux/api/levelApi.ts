import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { Level, LevelDetail } from "./types";

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
    getLevel: builder.query<LevelDetail, { courseId: string; levelId: string }>(
      {
        query: ({ courseId, levelId }) => ({
          url: `course/${courseId}/level/${levelId}`,
          method: "GET",
        }),
      }
    ),
  }),
});

export const { useGetLevelsQuery, useGetLevelQuery } = levelApi;
