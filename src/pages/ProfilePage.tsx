import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useRedux';

function ProfilePage() {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <div>Hello, {user?.username}</div>;
}

export default ProfilePage;
