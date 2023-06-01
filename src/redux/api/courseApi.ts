import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { Course } from "./types";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    courses: builder.query<Course[], void>({
      query() {
        return {
          url: "course",
          method: "GET",
        };
      },
    }),
    course: builder.query<Course, string>({
      query(id) {
        return {
          url: `course/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCoursesQuery, useCourseQuery } = courseApi;
