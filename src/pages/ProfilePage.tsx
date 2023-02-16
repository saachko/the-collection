import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useRedux';

import UserInfo from '../components/UserInfo/UserInfo';

function ProfilePage() {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <UserInfo avatar={user?.avatar} username={user?.username} roles={user?.roles} />
    </div>
  );
}

export default memo(ProfilePage);
