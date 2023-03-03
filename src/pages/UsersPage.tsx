import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { setUsers } from 'redux/slices/adminSlice';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import UsersFilters from 'components/FilterTools/UsersFilters';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';
import UsersTable from 'components/UsersTable/UsersTable';

import { defaultSortButtons } from 'utils/constants';
import { sortData } from 'utils/functions';

import useGetAllUsers from 'hooks/useGetAllUsers';

import { User } from 'ts/interfaces';

function UsersPage() {
  const { t } = useTranslation('translation');
  const { isAdmin, usersSorting, allUsers, users, isGetAllUsersLoading } =
    useGetAllUsers();

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
