import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useUpdateUserByIdMutation } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';

import { EditDropdownItem, User } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useUpdateUserByAdmin = (
  selectedUser: User | null,
  editActions: EditDropdownItem[]
) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
  const { user, isAdmin } = useAppSelector((state) => state.user);

  const [updateUserById, { data: updatedUser, isLoading: isUpdateUserLoading }] =
    useUpdateUserByIdMutation();

  const blockOrUnblockUser = async () => {
    if (selectedUser) {
      const toBlock = !selectedUser.isBlocked;
      await updateUserById({
        id: selectedUser._id,
        body: { ...selectedUser, isBlocked: toBlock },
      });
    }
  };

  const changeUserRole = async () => {
    if (selectedUser) {
      const newRole = selectedUser.roles.includes('admin') ? 'user' : 'admin';
      await updateUserById({
        id: selectedUser._id,
        body: { ...selectedUser, roles: [newRole] },
      });
    }
  };

  useEffect(() => {
    if (updatedUser) {
      dispatch(setSelectedUser(updatedUser));
    }
  }, [updatedUser]);

  const editActionsForAdmin: EditDropdownItem[] = [
    {
      id: '3',
      title: `${
        selectedUser && selectedUser?.roles.includes('admin')
          ? `${t('userCollector')}`
          : `${t('userAdmin')}`
      }`,
      action: () => changeUserRole(),
    },
    {
      id: '4',
      title: `${
        selectedUser && selectedUser?.isBlocked
          ? `${t('userUnblock')}`
          : `${t('userBlock')}`
      }`,
      action: () => blockOrUnblockUser(),
    },
  ];

  const setEditActions = () => {
    if (
      isAdmin &&
      selectedUser &&
      selectedUser._id !== user?._id &&
      location.pathname !== '/profile'
    ) {
      return editActions.concat(editActionsForAdmin);
    }
    return editActions;
  };

  return { setEditActions, isUpdateUserLoading };
};

export default useUpdateUserByAdmin;
