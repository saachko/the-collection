import { useEffect } from 'react';

import { useLazyGetAllItemsQuery } from 'redux/api/itemApiSlice';
import { setLastAddedItems } from 'redux/slices/itemSlice';
import { setAllItems } from 'redux/slices/searchSlice';

import { itemsIndex } from 'utils/constants';

import { useAppDispatch } from './useRedux';

const useGetAllItems = () => {
  const dispatch = useAppDispatch();
  const [
    getAllItems,
    { data: allItems, isSuccess: isSuccessGetAllItems, isLoading: isGetAllItemsLoading },
  ] = useLazyGetAllItemsQuery();

  useEffect(() => {
    (async () => {
      await getAllItems();
    })();
  }, []);

  useEffect(() => {
    if (allItems && isSuccessGetAllItems) {
      (async () => {
        const items = allItems.map((element) => ({ id: element._id, element }));
        await itemsIndex.deleteAllDocuments();
        await itemsIndex.addDocuments(items);
      })();
      dispatch(setAllItems(allItems));
      const lastItems = [...allItems].slice(0, 3);
      dispatch(setLastAddedItems(lastItems));
    }
  }, [allItems]);

  return { getAllItems, isGetAllItemsLoading };
};

export default useGetAllItems;
