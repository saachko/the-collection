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
      transformErrorResponse: ({ status }) => {
        switch (status) {
          case 403:
            return 'User already exists';
          default:
            return 'Unexpected registration error';
        }
      },
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
      transformErrorResponse: ({ status }) => {
        switch (status) {
          case 404:
            return "User doesn't exist";
          case 401:
            return 'Incorrect password!';
          case 403:
            return 'User is blocked!';
          default:
            return 'Unexpected authorization error';
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
