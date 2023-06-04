import { message } from "antd";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as any).message.includes("jwt expired")
  ) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQueryWithAuth(
            {
              url: "auth/refresh-token",
              method: "POST",
              body: {
                refreshToken,
              },
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            localStorage.setItem(
              "accessToken",
              (refreshResult.data as any).accessToken
            );
            result = await baseQueryWithAuth(args, api, extraOptions);
          } else {
            // duration 5s
            message.error("Your session has expired. Please log in again.", 5);
            // redirect to login page
            // clear local storage with tokens
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQueryWithAuth(args, api, extraOptions);
      }
    }
  }
  if (result.error && result.error.status !== 403) {
    message.error(
      (result.error?.data as any).message || "Something went wrong.",
      3
    );
  }

  return result;
};
