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
        url: `/all/${id}`,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ receiverId, messageData }) => ({
        url: `/send/${receiverId}`,
        method: "POST",
        body: messageData,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
