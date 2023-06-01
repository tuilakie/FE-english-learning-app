import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { setUser } from "../features/userSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { accessToken: string; refreshToken: string },
      { email: string; password: string; name: string }
    >({
      query(data) {
        return {
          url: "auth/register",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<
      { accessToken: string; refreshToken: string },
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "auth/logout",
          method: "POST",
          body: { refreshToken },
        };
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } catch (error) {
          console.log(error);
        }
      },
    }),
    whoami: builder.query<
      { id: string; name: string; email: string; iat: number; exp: number },
      void
    >({
      query() {
        return {
          url: "auth/whoami",
          method: "GET",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //   generateToken: builder.mutation<
    //     { accessToken: string; refreshToken: string },
    //     void
    //   >({
    //     query() {
    //       const refreshToken = localStorage.getItem("refreshToken");
    //       if (!refreshToken) throw new Error("No refresh token");
    //       return {
    //         url: "auth/refresh-token",
    //         method: "POST",
    //         body: { refreshToken },
    //       };
    //     },
    //     async onQueryStarted(_args, { queryFulfilled }) {
    //       try {
    //         const { data } = await queryFulfilled;
    //         localStorage.setItem("accessToken", data.accessToken);
    //         localStorage.setItem("refreshToken", data.refreshToken);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     },
    //   }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useWhoamiQuery,
  // useGenerateTokenMutation,
} = authApi;
