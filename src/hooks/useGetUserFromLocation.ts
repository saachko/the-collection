import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';

import { User } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useGetUserFromLocation = (selectedUser: User | null) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [
    getUserById,
    { data: currentUser, isSuccess: isSuccessGetUser, isError: isErrorGetUser },
  ] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (!selectedUser) {
      const currentUserId = location.pathname.split('/')[2];
      (async () => {
        await getUserById(currentUserId);
      })();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (currentUser && isSuccessGetUser) {
      dispatch(setSelectedUser(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (isErrorGetUser) {
      navigate('/404');
    }
  }, [isErrorGetUser]);
};

export default useGetUserFromLocation;
