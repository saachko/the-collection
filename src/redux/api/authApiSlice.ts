import { Endpoints, Methods } from 'ts/enums';
import { UserAuthFormValues, UserResponse } from 'ts/interfaces';

import apiSlice from './apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, UserAuthFormValues>({
      query: (body: UserAuthFormValues) => ({
        url: `${Endpoints.signUp}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
    }),

    signIn: builder.mutation<UserResponse, UserAuthFormValues>({
      query: (body: UserAuthFormValues) => ({
        url: `${Endpoints.signIn}`,
        method: Methods.post,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
