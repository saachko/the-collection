import { Endpoints, Methods } from 'ts/enums';
import { User, UserAuthFormValues } from 'ts/interfaces';

import apiSlice from './apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<{ user: User; token: string }, UserAuthFormValues>({
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

    signIn: builder.mutation<{ user: User; token: string }, UserAuthFormValues>({
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
