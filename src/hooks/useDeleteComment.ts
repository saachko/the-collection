import { useDeleteCommentByIdMutation } from 'redux/api/commentApiSlice';

const useDeleteComment = (commentId: string) => {
  const [deleteCommentById] = useDeleteCommentByIdMutation();

  const deleteComment = async () => {
    await deleteCommentById(commentId);
  };

  return { deleteComment };
};

export default useDeleteComment;
