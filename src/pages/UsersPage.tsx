import React, { memo, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { setUsers } from 'redux/slices/adminSlice';
import { setUsersSortingType } from 'redux/slices/sortSlice';

import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';
import UsersTable from 'components/UsersTable/UsersTable';

import { sortData } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function UsersPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const users = useAppSelector((state) => state.admin.users);
  const usersSorting = useAppSelector((state) => state.sort.usersSorting);
  const dispatch = useAppDispatch();
  const {
    data: allUsers,
    isSuccess: isSuccessGetAllUsers,
    isLoading: isGetAllUsersLoading,
  } = useGetAllUsersQuery(undefined, { skip: !isLoggedIn && !isAdmin });

  useEffect(() => {
    if (allUsers && isSuccessGetAllUsers) {
      const sortedData = sortData(allUsers, usersSorting);
      dispatch(setUsers(sortedData));
    }
  }, [isSuccessGetAllUsers]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <SortToolbar
        sortingList={users}
        sortingType={usersSorting}
        setSortingType={setUsersSortingType}
        setList={setUsers}
      />
      <UsersTable users={users} />
      {isGetAllUsersLoading && <Loader />}
    </div>
  );
}

export default memo(UsersPage);
