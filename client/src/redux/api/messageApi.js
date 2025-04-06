import { createApi } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: {
    baseUrl: "http://localhost:4050/api/v1/chat",
    credentials: "include",
  },
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) => ({
        url: `/send/${id}`,
      }),
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/sendMessage",
        method: "POST",
        body: messageData,
      }),
    }),
  }),
});
