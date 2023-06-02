import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const wordApi = createApi({
  reducerPath: " wordApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    learnWord: builder.mutation<
      { _count: { words: number } },
      { wordId: number[] }
    >({
      query: ({ wordId }) => ({
        url: `word/learned`,
        method: "POST",
        body: {
          wordId,
        },
      }),
    }),
    resetLearned: builder.mutation<{ _count: { words: number } }, number>({
      query: (levelId) => ({
        url: `word/reset-learned/${levelId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLearnWordMutation, useResetLearnedMutation } = wordApi;
