import { useEffect } from 'react';

import { useLazyGetAllCollectionsQuery } from 'redux/api/collectionApiSlice';
import { setCollections } from 'redux/slices/collectionSlice';

import { sortData } from 'utils/functions';

import { Collection } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useGetAllCollections = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const collectionsSorting = useAppSelector((state) => state.sort.collectionsSorting);
  const theme = useAppSelector((state) => state.filter.collectionsThemeFilter);
  const dispatch = useAppDispatch();

  const [
    getAllCollections,
    {
      data: allCollections,
      isSuccess: isSuccessGetCollections,
      isLoading: isGetCollectionsLoading,
    },
  ] = useLazyGetAllCollectionsQuery();

  useEffect(() => {
    (async () => {
      await getAllCollections();
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    if (allCollections && isSuccessGetCollections) {
      const sortedData = sortData(
        collectionsSorting,
        null,
        allCollections
      ) as Collection[];
      dispatch(setCollections(sortedData));
      if (theme) {
        const filteredData = sortedData.filter((element) => element.theme === theme);
        dispatch(setCollections(filteredData || null));
      }
    }
  }, [allCollections]);

  return { allCollections, theme, isGetCollectionsLoading, collectionsSorting };
};

export default useGetAllCollections;
