import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';
import { setLoggedIn, setToken, setUser } from 'redux/slices/userSlice';

import { UserAuthFormValues } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useAuth = () => {
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
    if (signUpData) {
      dispatch(setUser(signUpData.user));
      dispatch(setToken(signUpData.token));
      dispatch(setLoggedIn(true));
    }
  }, [signUpData]);

  const onSignIn: SubmitHandler<UserAuthFormValues> = async (formValues) => {
    await signIn({ ...formValues });
  };

  useEffect(() => {
    if (signInData) {
      dispatch(setUser(signInData.user));
      dispatch(setToken(signInData.token));
      dispatch(setLoggedIn(true));
    }
  }, [signInData]);

  const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

  return {
    onSignUp,
    onSignIn,
    isLoadingAuth,
    isErrorSignUp,
    isErrorSignIn,
    signUpErrorMessage,
    signInErrorMessage,
  };
};

export default useAuth;
