import { useEffect } from 'react';

import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { setLoggedIn, setLoggedOut, setUser } from 'redux/slices/userSlice';

import { checkToken } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const useCheckUserOnAppStart = () => {
  const token = useAppSelector((state) => state.user.token);
  const [
    getUserById,
    {
      data: currentUser,
      isSuccess: isSuccessGetUser,
      isLoading: isGetUserLoading,
      isError: isErrorGetUser,
    },
  ] = useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token?.token) {
      const idFromToken = checkToken(token.token);
      if (idFromToken && idFromToken === token.id) {
        (async () => {
          await getUserById(idFromToken);
        })();
        dispatch(setLoggedIn(true));
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser && isSuccessGetUser) {
      if (currentUser.isBlocked) {
        dispatch(setLoggedOut());
      } else {
        dispatch(setUser(currentUser));
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (isErrorGetUser) {
      dispatch(setLoggedOut());
    }
  }, [isErrorGetUser]);

  return { isGetUserLoading };
};

export default useCheckUserOnAppStart;
