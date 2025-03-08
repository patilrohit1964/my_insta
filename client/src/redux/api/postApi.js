import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4050/api/v1/post",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (postData) => ({
        url: "/addPost",
        method: "POST",
        body: postData,
      }),
    }),
    allPosts: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/delete/${postId}`,
        method: "DELETE",
      }),
    }),
    likePost: builder.mutation({
      query: ({ id, action }) => ({
        url: `/${id}/${action}`,
        method: "GET",
      }),
    }),
    commentPost: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/${id}/comment`,
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useAllPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useCommentPostMutation,
} = postApi;
export default postApi;
