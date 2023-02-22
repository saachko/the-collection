import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserByIdMutation } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { User } from 'ts/interfaces';
import { SetState } from 'ts/types';

const useDeleteUser = (setDeleteErrorShown: SetState<boolean>, user: User | null) => {
  const users = useAppSelector((state) => state.admin.users);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const dispatch = useAppDispatch();
  const [
    deleteUserById,
    { isSuccess: isSuccessDeleteUser, isLoading: isDeleteUserLoading },
  ] = useDeleteUserByIdMutation();
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (users) {
      const admins = users.filter((currentUser) => currentUser.roles.includes('admin'));
      if (admins.length < 2) {
        setDeleteErrorShown(true);
        return;
      }
    }
    if (user?._id) {
      await deleteUserById(user?._id);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteUser) {
      if (!isAdmin) {
        navigate('/');
        dispatch(setLoggedOut());
      } else {
        navigate('/users');
        dispatch(setSelectedUser(null));
      }
    }
  }, [isSuccessDeleteUser]);

  return { deleteUser, isDeleteUserLoading };
};

export default useDeleteUser;
