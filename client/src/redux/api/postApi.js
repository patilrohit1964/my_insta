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
      query: ({ id, text }) => {
        const formData = new FormData();
        formData.append("text", text);
        return {
          url: `/${id}/comment`,
          method: "POST",
          body: formData, // Don't set Content-Type manually!
        };
      },
    }),
    bookMarkPost: builder.query({
      query: (id) => ({
        url: `${id}/bookmark`,
        method: "GET",
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
  useBookMarkPostQuery,
} = postApi;
export default postApi;
