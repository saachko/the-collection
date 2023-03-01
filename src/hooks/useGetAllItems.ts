import { useEffect } from 'react';

import { useGetAllItemsQuery } from 'redux/api/itemApiSlice';
import { setLastAddedItems } from 'redux/slices/itemSlice';

import { useAppDispatch } from './useRedux';

const useGetAllItems = () => {
  const dispatch = useAppDispatch();
  const {
    data: allItems,
    isSuccess: isSuccessGetAllItems,
    isLoading: isGetAllItemsLoading,
    refetch,
  } = useGetAllItemsQuery();

  useEffect(() => {
    if (allItems && isSuccessGetAllItems) {
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
