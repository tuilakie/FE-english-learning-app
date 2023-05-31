import { fetchBaseQuery } from "@reduxjs/toolkit/query";

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
