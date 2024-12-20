import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {MOVIE_URL, BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIE_URL,
    credentials: "include", // Include credentials (cookies)
  }),
  endpoints: (builder) => ({}),
});