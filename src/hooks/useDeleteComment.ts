import { useEffect } from 'react';

import { useDeleteCommentByIdMutation } from 'redux/api/commentApiSlice';

import { commentsIndex } from 'utils/constants';

import { useAppSelector } from './useRedux';

const useDeleteComment = (commentId: string) => {
  const meilisearchComments = useAppSelector((state) => state.search.meilisearchComments);
  const [deleteCommentById, { data: deletedComment, isSuccess: isSuccessDeleteComment }] =
    useDeleteCommentByIdMutation();

  const deleteComment = async () => {
    await deleteCommentById(commentId);
  };

  useEffect(() => {
    if (deletedComment && isSuccessDeleteComment) {
      const meilisearchId = meilisearchComments.filter(
        (meiliComment) => meiliComment.element._id === deletedComment._id
      )[0].id;
      (async () => {
        await commentsIndex.deleteDocument(meilisearchId);
      })();
    }
  }, [deletedComment]);

  return { deleteComment };
};

export default useDeleteComment;
