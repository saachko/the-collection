import { useEffect } from 'react';

import { useDeleteCommentByIdMutation } from 'redux/api/commentApiSlice';

import useGetAllComments from './useGetAllComments';

const useDeleteComment = (commentId: string) => {
  const [deleteCommentById, { data: deletedComment, isSuccess: isSuccessDeleteComment }] =
    useDeleteCommentByIdMutation();
  const { getAllComments } = useGetAllComments();

  const deleteComment = async () => {
    await deleteCommentById(commentId);
  };

  useEffect(() => {
    if (deletedComment && isSuccessDeleteComment) {
      (async () => {
        await getAllComments();
      })();
    }
  }, [deletedComment]);

  return { deleteComment };
};

export default useDeleteComment;
