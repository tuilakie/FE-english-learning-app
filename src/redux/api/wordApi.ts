import { baseApi } from "./baseApi";

export const wordApi = baseApi.injectEndpoints({
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
      invalidatesTags: [
        { type: "Levels", id: "LIST" },
        { type: "Courses", id: "LIST" },
      ],
    }),
    resetLearned: builder.mutation<{ _count: { words: number } }, number>({
      query: (levelId) => ({
        url: `word/reset-learned/${levelId}`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "Levels", id: "LIST" },
        { type: "Courses", id: "LIST" },
      ],
    }),
  }),
});

export const { useLearnWordMutation, useResetLearnedMutation } = wordApi;
