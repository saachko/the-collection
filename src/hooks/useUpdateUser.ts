import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useUpdateUserByIdMutation } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import { setUser } from 'redux/slices/userSlice';

import { UpdateUserFormValues, User } from 'ts/interfaces';
import { SetState } from 'ts/types';

import { useAppDispatch, useAppSelector } from './useRedux';

const useUpdateUser = (
  user: User | null,
  setModalShown: SetState<boolean>,
  setUpdateErrorShown: SetState<boolean>
) => {
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const dispatch = useAppDispatch();
  const [
    updateUserById,
    { data: updatedUser, isLoading: isUpdateUserLoading, isError: isUpdateUserError },
  ] = useUpdateUserByIdMutation();

  const submitUpdate: SubmitHandler<UpdateUserFormValues> = async ({ ...formValues }) => {
    if (user) {
      const updatedUserBody: User = {
        ...user,
        username: formValues.username,
        email: formValues.email,
        avatar: formValues.avatar || user.avatar,
      };
      await updateUserById({ id: user?._id, body: updatedUserBody });
    }
  };

  useEffect(() => {
    if (isUpdateUserError) {
      setUpdateErrorShown(true);
    }
  }, [isUpdateUserError]);

  useEffect(() => {
    if (updatedUser && !isUpdateUserError) {
      if (!selectedUser) {
        dispatch(setUser(updatedUser));
      } else {
        dispatch(setSelectedUser(updatedUser));
      }
      setModalShown(false);
    }
  }, [updatedUser]);

  return { submitUpdate, isUpdateUserLoading };
};

export default useUpdateUser;
