import { useEffect } from 'react';

import { useGetAllItemsQuery } from 'redux/api/itemApiSlice';
import { setLastAddedItems } from 'redux/slices/itemSlice';
import { setAllItems } from 'redux/slices/searchSlice';

import { meiliSearchClient } from 'utils/constants';

import { useAppDispatch } from './useRedux';

const useGetAllItems = () => {
  const dispatch = useAppDispatch();
  const {
    data: allItems,
    isSuccess: isSuccessGetAllItems,
    isLoading: isGetAllItemsLoading,
    refetch,
  } = useGetAllItemsQuery();
  const index = meiliSearchClient.index('items');

  useEffect(() => {
    if (allItems && isSuccessGetAllItems) {
      (async () => {
        const items = allItems.map((element, ind) => ({ id: ind, element }));
        await index.addDocuments(items);
      })();
      dispatch(setAllItems(allItems));
      const lastItems = [...allItems].slice(0, 3);
      dispatch(setLastAddedItems(lastItems));
    }
  }, [allItems]);

  useEffect(() => {
    refetch();
  }, []);

  return { isGetAllItemsLoading };
};

export default useGetAllItems;
