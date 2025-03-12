import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4050/api/v1/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    suggestedUser: builder.query({
      query: () => ({
        url: "/suggested",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogoutUserQuery,
  useSuggestedUserQuery,
} = authApi;

export default authApi;
