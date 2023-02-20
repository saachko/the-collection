import { Endpoints, Methods } from 'ts/enums';
import { Collection, CollectionRequestBody } from 'ts/interfaces';

import apiSlice from './apiSlice';

const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query<Collection[], void>({
      query: () => ({
        url: `${Endpoints.collections}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((collection) => ({
                type: 'Collection' as const,
                id: collection._id,
              })),
              'Collection',
            ]
          : ['Collection'],
    }),

    getCollectionById: builder.query<Collection, string>({
      query: (collectionId: string) => ({
        url: `${Endpoints.collections}${collectionId}`,
        method: Methods.get,
      }),
      providesTags: ['Collection'],
    }),

    getCollectionsByUserId: builder.query<Collection[], string>({
      query: (userId: string) => ({
        url: `${Endpoints.collectionsByUser}${userId}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((collection) => ({
                type: 'Collection' as const,
                id: collection._id,
              })),
              'Collection',
            ]
          : ['Collection'],
    }),

    createCollection: builder.mutation<Collection, CollectionRequestBody>({
      query: (body: CollectionRequestBody) => ({
        url: `${Endpoints.collections}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Collection'],
    }),

    deleteCollectionById: builder.mutation<Collection, string>({
      query: (collectionId: string) => ({
        url: `${Endpoints.collections}${collectionId}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Collection'],
    }),

    updateCollectionById: builder.mutation<
      Collection,
      { collectionId: string; body: Collection }
    >({
      query: ({ collectionId, body }) => ({
        url: `${Endpoints.collections}${collectionId}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Collection'],
    }),
  }),
});

export const {
  useLazyGetAllCollectionsQuery,
  useLazyGetCollectionByIdQuery,
  useLazyGetCollectionsByUserIdQuery,
  useCreateCollectionMutation,
  useDeleteCollectionByIdMutation,
  useUpdateCollectionByIdMutation,
} = collectionApiSlice;
