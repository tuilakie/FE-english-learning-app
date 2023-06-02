import { Level, LevelDetail } from "./types";
import { baseApi } from "./baseApi";

export const levelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLevels: builder.query<Level[], string>({
      query: (courseId) => ({
        url: `course/${courseId}/level`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Levels" as const, id })),
              { type: "Levels", id: "LIST" },
            ]
          : [{ type: "Levels", id: "LIST" }],
    }),
    getLevel: builder.query<LevelDetail, { courseId: string; levelId: string }>(
      {
        query: ({ courseId, levelId }) => ({
          url: `course/${courseId}/level/${levelId}`,
          method: "GET",
        }),
        providesTags: (_result, _error, { levelId }) => [
          { type: "Levels", id: levelId },
          { type: "Levels", id: "LIST" },
        ],
      }
    ),
  }),
});

export const { useGetLevelsQuery, useGetLevelQuery } = levelApi;
