import { Endpoints, Methods } from 'ts/enums';
import { CustomField, CustomFieldRequestBody } from 'ts/interfaces';

import apiSlice from './apiSlice';

const customFieldApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomFieldById: builder.query<CustomField, string>({
      query: (fieldId: string) => ({
        url: `${Endpoints.customFields}${fieldId}`,
        method: Methods.get,
      }),
      providesTags: ['CustomField'],
    }),

    getCustomFieldsByCollectionId: builder.query<CustomField[], string>({
      query: (collectionId: string) => ({
        url: `${Endpoints.customFieldsInCollection}${collectionId}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((customField) => ({
                type: 'CustomField' as const,
                id: customField._id,
              })),
              'CustomField',
            ]
          : ['CustomField'],
    }),

    createCustomField: builder.mutation<CustomField, CustomFieldRequestBody>({
      query: (body: CustomFieldRequestBody) => ({
        url: `${Endpoints.customFields}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['CustomField'],
    }),

    deleteCustomFieldById: builder.mutation<CustomField, string>({
      query: (fieldId: string) => ({
        url: `${Endpoints.customFields}${fieldId}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['CustomField'],
    }),

    updateCustomFieldById: builder.mutation<
      CustomField,
      { fieldId: string; body: CustomField }
    >({
      query: ({ fieldId, body }) => ({
        url: `${Endpoints.customFields}${fieldId}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['CustomField'],
    }),
  }),
});

export const {
  useLazyGetCustomFieldByIdQuery,
  useLazyGetCustomFieldsByCollectionIdQuery,
  useCreateCustomFieldMutation,
  useDeleteCustomFieldByIdMutation,
  useUpdateCustomFieldByIdMutation,
} = customFieldApiSlice;
