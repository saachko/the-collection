import { useEffect } from 'react';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { setCollectionsBySelectedUser } from 'redux/slices/collectionSlice';
import { setDefaultCollectionsBySelectedUserFilters } from 'redux/slices/filterSlice';
import { setDefaultCollectionsBySelectedUserSorting } from 'redux/slices/sortSlice';

import { User } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useGetCollectionsBySelectedUser = (selectedUser: User | null) => {
  const dispatch = useAppDispatch();

  const [
    getCollectionsByUser,
    {
      data: collections,
      isSuccess: isSuccessGetCollections,
      isLoading: isGetCollectionsLoading,
    },
  ] = useLazyGetCollectionsByUserIdQuery();

  useEffect(() => {
    (async () => {
      if (selectedUser) await getCollectionsByUser(selectedUser._id);
    })();
    dispatch(setDefaultCollectionsBySelectedUserFilters());
    dispatch(setDefaultCollectionsBySelectedUserSorting());
  }, [selectedUser]);

  useEffect(() => {
    if (collections && isSuccessGetCollections) {
      dispatch(setCollectionsBySelectedUser(collections));
    }
  }, [collections]);

  return { collections, isGetCollectionsLoading };
};

export default useGetCollectionsBySelectedUser;
