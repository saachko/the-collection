import { Endpoints, Methods } from 'ts/enums';
import { Collection, CollectionFormValues } from 'ts/interfaces';

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
              ...result.map((user) => ({ type: 'Collection' as const, id: user._id })),
              'Collection',
            ]
          : ['Collection'],
    }),

    getCollectionById: builder.query<Collection, string>({
      query: (id: string) => ({
        url: `${Endpoints.collections}${id}`,
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
              ...result.map((user) => ({ type: 'Collection' as const, id: user._id })),
              'Collection',
            ]
          : ['Collection'],
    }),

    createCollection: builder.mutation<Collection, CollectionFormValues>({
      query: (body: CollectionFormValues) => ({
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
      query: (id: string) => ({
        url: `${Endpoints.collections}${id}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Collection'],
    }),

    updateCollectionById: builder.mutation<Collection, { id: string; body: Collection }>({
      query: ({ id, body }) => ({
        url: `${Endpoints.collections}${id}`,
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
  useLazyGetCollectionByIdQuery,
  useGetAllCollectionsQuery,
  useGetCollectionsByUserIdQuery,
  useCreateCollectionMutation,
  useDeleteCollectionByIdMutation,
  useUpdateCollectionByIdMutation,
} = collectionApiSlice;
