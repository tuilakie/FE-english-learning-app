import { baseApi } from "./baseApi";
import { Course } from "./types";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    courses: builder.query<Course[], void>({
      query() {
        return {
          url: "course",
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Courses" as const, id })),
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),
    course: builder.query<Course, string>({
      query(id) {
        return {
          url: `course/${id}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, id) => [
        { type: "Courses", id },
        { type: "Courses", id: "LIST" },
      ],
    }),
  }),
});

export const { useCoursesQuery, useCourseQuery } = courseApi;
