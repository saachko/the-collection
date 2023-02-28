import { useEffect } from 'react';

import { useUpdateItemByIdMutation } from 'redux/api/itemApiSlice';
import { setSelectedItem } from 'redux/slices/itemSlice';

import { Item } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useLikeItem = (item: Item | null) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [updateItem, { data: updatedItem, isSuccess: isSuccessLike }] =
    useUpdateItemByIdMutation();

  const likeItem = async () => {
    if (item && user) {
      const newLikesList = [...item.likes, user._id];
      await updateItem({ itemId: item._id, body: { ...item, likes: newLikesList } });
    }
  };

  const removeLike = async () => {
    if (item && user) {
      const newLikesList = item.likes.filter((id) => id !== user._id);
      await updateItem({ itemId: item._id, body: { ...item, likes: newLikesList } });
    }
  };

  useEffect(() => {
    if (updatedItem && isSuccessLike) {
      dispatch(setSelectedItem(updatedItem));
    }
  }, [updatedItem]);

  return { likeItem, removeLike };
};

export default useLikeItem;
