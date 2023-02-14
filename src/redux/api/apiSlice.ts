import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'redux/store';

import { baseUrl } from 'utils/constants';

const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Collection', 'Item', 'CustomField', 'Tag', 'Comment'],
  endpoints: () => ({}),
});

export default apiSlice;