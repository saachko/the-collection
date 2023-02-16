import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserByIdMutation } from 'redux/api/userApiSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const useDeleteUser = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [
    deleteUserById,
    { isSuccess: isSuccessDeleteUser, isLoading: isDeleteUserLoading },
  ] = useDeleteUserByIdMutation();
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (user?._id) {
      await deleteUserById(user?._id);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteUser) {
      navigate('/');
      dispatch(setLoggedOut());
    }
  }, [isSuccessDeleteUser]);

  return { deleteUser, isDeleteUserLoading };
};

export default useDeleteUser;
