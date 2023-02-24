import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { setUsers } from 'redux/slices/adminSlice';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import UsersFilters from 'components/FilterTools/UsersFilters';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';
import UsersTable from 'components/UsersTable/UsersTable';

import { defaultSortButtons } from 'utils/constants';
import { filterUsersByRole, filterUsersByStatus, sortData } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { User } from 'ts/interfaces';

function UsersPage() {
  const { t } = useTranslation('translation');
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const users = useAppSelector((state) => state.admin.users);
  const usersSorting = useAppSelector((state) => state.sort.usersSorting);
  const filterAdmins = useAppSelector((state) => state.filter.usersFilterAdmins);
  const filterBlocked = useAppSelector((state) => state.filter.usersFilterBlocked);
  const dispatch = useAppDispatch();
  const {
    data: allUsers,
    isSuccess: isSuccessGetAllUsers,
    isLoading: isGetAllUsersLoading,
  } = useGetAllUsersQuery(undefined, { skip: !isLoggedIn && !isAdmin });

  useEffect(() => {
    if (allUsers && isSuccessGetAllUsers) {
      const sortedData = sortData(usersSorting, allUsers) as User[];
      dispatch(setUsers(sortedData));
      if (filterAdmins) {
        const filteredData = filterUsersByRole(sortedData);
        dispatch(setUsers(filteredData || null));
      }
      if (filterBlocked) {
        const filteredData = filterUsersByStatus(users);
        dispatch(setUsers(filteredData || null));
      }
    }
  }, [isSuccessGetAllUsers]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <div className="d-flex justify-content-center justify-content-md-end gap-3">
        <UsersFilters
          allUsers={sortData(usersSorting, allUsers || null) as User[]}
          filteringList={users}
          setList={setUsers}
        />
        <SortToolbar
          sortingUserList={users}
          sortingType={usersSorting}
          sortButtons={defaultSortButtons}
        />
      </div>
      <UsersTable users={users} />
      {users?.length === 0 && (
        <EmptyContainer title={t('filter.noUsersResult')} text="" />
      )}
      {isGetAllUsersLoading && <Loader />}
    </div>
  );
}

export default memo(UsersPage);
