import { useEffect } from 'react';

import { useLazyGetCommentsByItemIdQuery } from 'redux/api/commentApiSlice';
import { setCommentsToItem } from 'redux/slices/itemSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useGetCommentsToItem = () => {
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [getComments, { data: commentsToItem, isSuccess: isSuccessGetComments }] =
    useLazyGetCommentsByItemIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedItem) {
      (async () => {
        await getComments(selectedItem._id);
      })();
    }
  }, [selectedItem]);

  useEffect(() => {
    if (commentsToItem && isSuccessGetComments) {
      dispatch(setCommentsToItem(commentsToItem));
    }
  }, [commentsToItem]);
};

export default useGetCommentsToItem;
