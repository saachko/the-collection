import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useRedux';

function UsersPage() {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.user);

  if (isLoggedIn && isAdmin) {
    return <div>UsersPage</div>;
  }
  return <Navigate to="/" />;
}

export default UsersPage;
