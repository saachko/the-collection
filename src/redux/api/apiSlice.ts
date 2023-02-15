import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'redux/store';

const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders(headers, { getState }) {
      const { token } = (getState() as RootState).user;

      if (token?.token) {
        headers.set('authorization', `Bearer ${token.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Collection', 'Item', 'CustomField', 'Tag', 'Comment'],
  endpoints: () => ({}),
});

export default apiSlice;
