import React, { memo, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { setUsers } from 'redux/slices/adminSlice';

import Loader from 'components/Loader/Loader';
import UsersTable from 'components/UsersTable/UsersTable';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function UsersPage() {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const {
    data: allUsers,
    isSuccess: isSuccessGetAllUsers,
    isLoading: isGetAllUsersLoading,
  } = useGetAllUsersQuery(undefined, { skip: !isLoggedIn && !isAdmin });

  useEffect(() => {
    if (allUsers && isSuccessGetAllUsers) {
      dispatch(setUsers(allUsers));
    }
  }, [isSuccessGetAllUsers]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <UsersTable users={users} />
      {isGetAllUsersLoading && <Loader />}
    </div>
  );
}

export default memo(UsersPage);
