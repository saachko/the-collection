import { Endpoints, Methods } from 'ts/enums';
import { Comment, CommentRequestBody } from 'ts/interfaces';

import apiSlice from './apiSlice';

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentById: builder.query<Comment, string>({
      query: (commentId: string) => ({
        url: `${Endpoints.comments}${commentId}`,
        method: Methods.get,
      }),
      providesTags: ['Comment'],
    }),

    getCommentsByItemId: builder.query<Comment[], string>({
      query: (itemId: string) => ({
        url: `${Endpoints.commentsToItem}${itemId}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((comment) => ({
                type: 'Comment' as const,
                id: comment._id,
              })),
              'Comment',
            ]
          : ['Comment'],
    }),

    createComment: builder.mutation<Comment, CommentRequestBody>({
      query: (body: CommentRequestBody) => ({
        url: `${Endpoints.comments}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Comment'],
    }),

    deleteCommentById: builder.mutation<Comment, string>({
      query: (commentId: string) => ({
        url: `${Endpoints.comments}${commentId}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Comment'],
    }),

    updateCommentById: builder.mutation<Comment, { commentId: string; body: Comment }>({
      query: ({ commentId, body }) => ({
        url: `${Endpoints.comments}${commentId}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useLazyGetCommentByIdQuery,
  useLazyGetCommentsByItemIdQuery,
  useCreateCommentMutation,
  useDeleteCommentByIdMutation,
  useUpdateCommentByIdMutation,
} = commentApiSlice;
