import { Endpoints, Methods } from 'ts/enums';
import { Tag, TagRequestBody } from 'ts/interfaces';

import apiSlice from './apiSlice';

const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], void>({
      query: () => ({
        url: `${Endpoints.tags}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((tag) => ({
                type: 'Tag' as const,
                id: tag._id,
              })),
              'Tag',
            ]
          : ['Tag'],
    }),

    getTagById: builder.query<Tag, string>({
      query: (tagId: string) => ({
        url: `${Endpoints.tags}${tagId}`,
        method: Methods.get,
      }),
      providesTags: ['Tag'],
    }),

    getTagsByItemId: builder.query<Tag[], string>({
      query: (itemId: string) => ({
        url: `${Endpoints.tagsToItem}${itemId}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((tag) => ({
                type: 'Tag' as const,
                id: tag._id,
              })),
              'Tag',
            ]
          : ['Tag'],
    }),

    createTag: builder.mutation<Tag, TagRequestBody>({
      query: (body: TagRequestBody) => ({
        url: `${Endpoints.tags}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Tag'],
    }),

    updateTagById: builder.mutation<Tag, { tagId: string; body: Tag }>({
      query: ({ tagId, body }) => ({
        url: `${Endpoints.tags}${tagId}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

export const {
  useLazyGetTagByIdQuery,
  useLazyGetAllTagsQuery,
  useLazyGetTagsByItemIdQuery,
  useGetAllTagsQuery,
  useCreateTagMutation,
  useUpdateTagByIdMutation,
} = tagApiSlice;
