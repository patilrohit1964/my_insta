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
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ receiverId, textMessage }) => ({
        url: `/send/${receiverId}`,
        method: "POST",
        body: { message: textMessage },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
export default chatApi;
