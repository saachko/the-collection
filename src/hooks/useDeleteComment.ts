import { useEffect } from 'react';

import { useDeleteCommentByIdMutation } from 'redux/api/commentApiSlice';

import { commentsIndex } from 'utils/constants';

const useDeleteComment = (commentId: string) => {
  const [deleteCommentById, { data: deletedComment, isSuccess: isSuccessDeleteComment }] =
    useDeleteCommentByIdMutation();

  const deleteComment = async () => {
    await deleteCommentById(commentId);
  };

  useEffect(() => {
    if (deletedComment && isSuccessDeleteComment) {
      (async () => {
        await commentsIndex.deleteDocument(deletedComment._id);
      })();
    }
  }, [deletedComment]);

  return { deleteComment };
};

export default useDeleteComment;
