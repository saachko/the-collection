import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';
import { setLoggedIn, setToken, setUser } from 'redux/slices/userSlice';

import { UserAuthFormValues } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useAuth = (id: string) => {
  const dispatch = useAppDispatch();

  const [
    signUp,
    {
      data: signUpData,
      isLoading: isLoadingSignUp,
      isError: isErrorSignUp,
      error: signUpErrorMessage,
    },
  ] = useSignUpMutation();
  const [
    signIn,
    {
      data: signInData,
      isLoading: isLoadingSignIn,
      isError: isErrorSignIn,
      error: signInErrorMessage,
    },
  ] = useSignInMutation();

  const onSignUp: SubmitHandler<UserAuthFormValues> = async (formValues) => {
    await signUp({ ...formValues });
  };

  useEffect(() => {
    if (signUpData && !isErrorSignUp) {
      dispatch(setUser(signUpData.user));
      dispatch(setToken({ token: signUpData.token, id: signUpData.user._id }));
      dispatch(setLoggedIn(true));
    }
  }, [signUpData]);

  const onSignIn: SubmitHandler<UserAuthFormValues> = async (formValues) => {
    await signIn({ ...formValues });
  };

  useEffect(() => {
    if (signInData && !isErrorSignIn) {
      dispatch(setUser(signInData.user));
      dispatch(setToken({ token: signInData.token, id: signInData.user._id }));
      dispatch(setLoggedIn(true));
    }
  }, [signInData]);

  const submitForm: SubmitHandler<UserAuthFormValues> = async ({ ...formValues }) => {
    if (id === 'signUp') {
      await onSignUp(formValues);
    } else {
      await onSignIn(formValues);
    }
  };

  const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

  return {
    submitForm,
    isLoadingAuth,
    signUpErrorMessage,
    signInErrorMessage,
  };
};

export default useAuth;
