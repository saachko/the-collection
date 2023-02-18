import { Endpoints, Methods } from 'ts/enums';
import { User } from 'ts/interfaces';

import apiSlice from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `${Endpoints.users}`,
        method: Methods.get,
      }),
      providesTags: (result) =>
        result
          ? [...result.map((user) => ({ type: 'User' as const, id: user._id })), 'User']
          : ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (id: string) => ({
        url: `${Endpoints.users}${id}`,
        method: Methods.get,
      }),
      providesTags: ['User'],
    }),

    deleteUserById: builder.mutation<User, string>({
      query: (id: string) => ({
        url: `${Endpoints.users}${id}`,
        method: Methods.delete,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    updateUserById: builder.mutation<User, { id: string; body: User }>({
      query: ({ id, body }) => ({
        url: `${Endpoints.users}${id}`,
        method: Methods.put,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLazyGetUserByIdQuery,
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
} = userApiSlice;
