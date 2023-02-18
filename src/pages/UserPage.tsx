import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useLocation } from 'react-router-dom';

import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import UserInfo from 'components/UserInfo/UserInfo';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function UserPage() {
  const { isAdmin } = useAppSelector((state) => state.user);
  const { selectedUser } = useAppSelector((state) => state.admin);
  const { t } = useTranslation('translation');
  const location = useLocation();
  const [getUserById, { data: currentUser, isSuccess: isSuccessGetUser }] =
    useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

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
  }, [isSuccessGetUser]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <NavLink to="/users" className="link mb-2">
        {t('usersPage.return')}
      </NavLink>
      <UserInfo
        avatar={selectedUser?.avatar}
        username={selectedUser?.username}
        roles={selectedUser?.roles}
      />
      <EmptyContainer text={t('collections.empty')} />
    </div>
  );
}

export default UserPage;
