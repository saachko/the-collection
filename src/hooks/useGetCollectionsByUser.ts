import { useEffect } from 'react';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { setCollectionsByUser } from 'redux/slices/collectionSlice';
import { setDefaultCollectionsByUserFilters } from 'redux/slices/filterSlice';
import { setDefaultCollectionsByUserSorting } from 'redux/slices/sortSlice';

import { User } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useCollectionsByUser = (user: User | null) => {
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
      if (user) await getCollectionsByUser(user._id);
    })();
  }, [user]);

  useEffect(() => {
    if (collections && isSuccessGetCollections) {
      dispatch(setCollectionsByUser(collections));
    }
  }, [collections]);

  useEffect(
    () => () => {
      dispatch(setDefaultCollectionsByUserFilters());
      dispatch(setDefaultCollectionsByUserSorting());
    },
    []
  );

  return { collections, isGetCollectionsLoading };
};

export default useCollectionsByUser;
