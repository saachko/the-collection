import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { useAppSelector } from 'hooks/useRedux';

import UserInfo from '../components/UserInfo/UserInfo';

function ProfilePage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const { t } = useTranslation('translation');

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <UserInfo avatar={user?.avatar} username={user?.username} roles={user?.roles} />
      <EmptyContainer
        title={t('collections.empty')}
        text={t('collections.emptyAndLoggedIn')}
      />
    </div>
  );
}

export default memo(ProfilePage);
