import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserByIdMutation } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const useDeleteUser = () => {
  const { user } = useAppSelector((state) => state.user);
  const { selectedUser } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [
    deleteUserById,
    { isSuccess: isSuccessDeleteUser, isLoading: isDeleteUserLoading },
  ] = useDeleteUserByIdMutation();
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (user?._id) {
      await deleteUserById(selectedUser?._id || user?._id);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteUser) {
      if (!selectedUser) {
        navigate('/');
        dispatch(setLoggedOut());
      } else {
        navigate(-1);
        dispatch(setSelectedUser(null));
      }
    }
  }, [isSuccessDeleteUser]);

  return { deleteUser, isDeleteUserLoading };
};

export default useDeleteUser;
