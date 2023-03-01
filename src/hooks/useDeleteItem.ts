import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteItemByIdMutation } from 'redux/api/itemApiSlice';
import { setSelectedItem } from 'redux/slices/itemSlice';

import { SetState } from 'ts/types';

import { useAppDispatch } from './useRedux';

const useDeleteItem = (
  setDeleteErrorShown: SetState<boolean>,
  itemId: string | undefined
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    deleteItemById,
    {
      data: deletedItem,
      isSuccess: isSuccessDeleteItem,
      isLoading: isDeleteItemLoading,
      isError: isDeleteItemError,
    },
  ] = useDeleteItemByIdMutation();

  const deleteItem = async () => {
    if (itemId) {
      await deleteItemById(itemId);
    }
  };

  useEffect(() => {
    if (deletedItem && isSuccessDeleteItem) {
      navigate(`/collections/${deletedItem.collectionId}`);
      dispatch(setSelectedItem(null));
    }
  }, [isSuccessDeleteItem]);

  useEffect(() => {
    if (isDeleteItemError) {
      setDeleteErrorShown(true);
    }
  }, [isDeleteItemError]);

  return { deleteItem, isDeleteItemLoading };
};

export default useDeleteItem;
