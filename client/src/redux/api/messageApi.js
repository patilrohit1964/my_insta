import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4050/api/v1/message",
    credentials: "include",
  }),
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
export default chatApi;
