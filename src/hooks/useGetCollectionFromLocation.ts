import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useLazyGetCollectionByIdQuery } from 'redux/api/collectionApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const useGetCollectionFromLocation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const [
    getCollectionById,
    {
      data: currentCollection,
      isSuccess: isSuccessGetCollection,
      isLoading: isCollectionLoading,
      isError: isErrorGetCollection,
    },
  ] = useLazyGetCollectionByIdQuery();

  useEffect(() => {
    if (!selectedCollection) {
      const currentCollectionId = location.pathname.split('/')[2];
      (async () => {
        await getCollectionById(currentCollectionId);
      })();
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (currentCollection && isSuccessGetCollection) {
      dispatch(setSelectedCollection(currentCollection));
    }
  }, [isSuccessGetCollection]);

  return { isCollectionLoading, isErrorGetCollection };
};

export default useGetCollectionFromLocation;
