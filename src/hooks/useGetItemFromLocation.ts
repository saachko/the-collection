import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLazyGetItemByIdQuery } from 'redux/api/itemApiSlice';
import { setSelectedItem } from 'redux/slices/itemSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const useGetItemFromLocation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [
    getItemById,
    {
      data: currentItem,
      isSuccess: isSuccessGetItem,
      isLoading: isItemLoading,
      isError: isErrorGetItem,
    },
  ] = useLazyGetItemByIdQuery();

  useEffect(() => {
    if (!selectedItem) {
      const currentItemId = location.pathname.split('/')[2];
      (async () => {
        await getItemById(currentItemId);
      })();
    }
  }, [selectedItem]);

  useEffect(() => {
    if (currentItem && isSuccessGetItem) {
      dispatch(setSelectedItem(currentItem));
    }
  }, [currentItem]);

  useEffect(() => {
    if (isErrorGetItem) {
      navigate('/404');
    }
  }, [isErrorGetItem]);

  return { isItemLoading };
};

export default useGetItemFromLocation;
