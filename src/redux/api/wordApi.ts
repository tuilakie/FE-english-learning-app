import { baseApi } from "./baseApi";
import { CaseStudies } from "./types";

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
        { type: "Words", id: "LIST" },
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
        { type: "Words", id: "LIST" },
      ],
    }),
    caseStudies: builder.query<
      CaseStudies,
      { courseId: string; levelId: string }
    >({
      query: ({ courseId, levelId }) => ({
        url: `word/case-studies?courseId=${courseId}&levelId=${levelId}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Words", id: "LIST" }],
    }),

    saveProgress: builder.mutation<
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
        { type: "Words", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useLearnWordMutation,
  useResetLearnedMutation,
  useCaseStudiesQuery,
  useSaveProgressMutation,
} = wordApi;
