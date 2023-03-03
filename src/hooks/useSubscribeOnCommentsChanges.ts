import { useEffect } from 'react';

import { useLazyGetChangedCommentQuery } from 'redux/api/commentApiSlice';
import { setCommentsToItem } from 'redux/slices/itemSlice';

import { Comment } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSubscribeOnCommentsChanges = () => {
  const commentsToItem = useAppSelector((state) => state.item.commentsToItem);
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [getLatestComment, { data: changedComment }] = useLazyGetChangedCommentQuery();
  const dispatch = useAppDispatch();

  const subscribeOnNewComments = async () => {
    try {
      await getLatestComment();
      await subscribeOnNewComments();
    } catch (error) {
      setTimeout(() => {
        subscribeOnNewComments();
      }, 1000);
    }
  };

  useEffect(() => {
    subscribeOnNewComments();
  }, []);

  useEffect(() => {
    if (changedComment && commentsToItem) {
      if (changedComment.comment.itemId === selectedItem?._id) {
        const comment: Comment = { ...changedComment.comment };
        switch (changedComment.type) {
          case 'newComment':
            dispatch(setCommentsToItem([...commentsToItem, comment]));
            break;
          case 'deletedComment':
            dispatch(
              setCommentsToItem(commentsToItem.filter((elem) => elem._id !== comment._id))
            );
            break;
          default:
            break;
        }
      }
    }
  }, [changedComment]);
};

export default useSubscribeOnCommentsChanges;
