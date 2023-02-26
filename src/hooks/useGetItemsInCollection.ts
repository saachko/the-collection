import { useEffect } from 'react';

import { useLazyGetItemsByCollectionIdQuery } from 'redux/api/itemApiSlice';
import { setItems } from 'redux/slices/itemSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useGetItemsInCollection = (collectionId: string | undefined) => {
  const items = useAppSelector((state) => state.item.itemsInCollection);
  const dispatch = useAppDispatch();
  const [
    getItems,
    { data: allItems, isSuccess: isSuccessGetItems, isLoading: isLoadingItems },
  ] = useLazyGetItemsByCollectionIdQuery();

  useEffect(() => {
    if (collectionId) {
      (async () => {
        await getItems(collectionId);
      })();
    }
  }, [collectionId]);

  useEffect(() => {
    if (allItems && isSuccessGetItems) {
      dispatch(setItems(allItems));
    }
  }, [allItems]);

  return { items, isLoadingItems };
};

export default useGetItemsInCollection;
