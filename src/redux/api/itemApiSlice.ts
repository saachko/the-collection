import { Endpoints, Methods } from 'ts/enums';
import { Item, ItemRequestBody } from 'ts/interfaces';

import apiSlice from './apiSlice';

const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<Item[], void>({
      query: () => ({
        url: `${Endpoints.items}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: 'Item' as const,
                id: item._id,
              })),
              'Item',
            ]
          : ['Item'],
    }),

    getItemById: builder.query<Item, string>({
      query: (itemId: string) => ({
        url: `${Endpoints.items}${itemId}`,
        method: Methods.get,
      }),
      providesTags: ['Item'],
    }),

    getItemsByCollectionId: builder.query<Item[], string>({
      query: (collectionId: string) => ({
        url: `${Endpoints.itemsInCollection}${collectionId}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: 'Item' as const,
                id: item._id,
              })),
              'Item',
            ]
          : ['Item'],
    }),

    createItem: builder.mutation<Item, ItemRequestBody>({
      query: (body: ItemRequestBody) => ({
        url: `${Endpoints.items}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Item'],
    }),

    deleteItemById: builder.mutation<Item, string>({
      query: (itemId: string) => ({
        url: `${Endpoints.items}${itemId}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Item'],
    }),

    updateItemById: builder.mutation<Item, { itemId: string; body: Item }>({
      query: ({ itemId, body }) => ({
        url: `${Endpoints.items}${itemId}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
});

export const {
  useLazyGetItemByIdQuery,
  useLazyGetAllItemsQuery,
  useLazyGetItemsByCollectionIdQuery,
  useGetAllItemsQuery,
  useCreateItemMutation,
  useDeleteItemByIdMutation,
  useUpdateItemByIdMutation,
} = itemApiSlice;
