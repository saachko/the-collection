import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate } from 'react-router-dom';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import UserInfo from 'components/UserInfo/UserInfo';

import { useAppSelector } from 'hooks/useRedux';

function UserPage() {
  const { isAdmin } = useAppSelector((state) => state.user);
  const { selectedUser } = useAppSelector((state) => state.admin);
  const { t } = useTranslation('translation');

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
