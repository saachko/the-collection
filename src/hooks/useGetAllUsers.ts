import { useEffect } from 'react';

import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { setUsers } from 'redux/slices/adminSlice';

import { filterUsersByRole, filterUsersByStatus, sortData } from 'utils/functions';

import { User } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useGetAllUsers = () => {
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
    refetch,
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
  }, [allUsers]);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      refetch();
    }
  }, []);

  return { isAdmin, usersSorting, allUsers, users, isGetAllUsersLoading };
};

export default useGetAllUsers;
