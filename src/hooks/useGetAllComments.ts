import { useEffect } from 'react';

import { useLazyGetAllCommentsQuery } from 'redux/api/commentApiSlice';
import { setAllComments } from 'redux/slices/searchSlice';

import { commentsIndex } from 'utils/constants';

import { useAppDispatch } from './useRedux';

const useGetAllComments = () => {
  const dispatch = useAppDispatch();
  const [
    getAllComments,
    {
      data: allComments,
      isSuccess: isSuccessGetComments,
      isLoading: isGetCommentsLoading,
    },
  ] = useLazyGetAllCommentsQuery();

  useEffect(() => {
    (async () => {
      await getAllComments();
    })();
  }, []);

  useEffect(() => {
    if (allComments && isSuccessGetComments) {
      (async () => {
        const comments = allComments.map((element) => ({ id: element._id, element }));
        await commentsIndex.deleteAllDocuments();
        await commentsIndex.addDocuments(comments);
      })();
      dispatch(setAllComments(allComments));
    }
  }, [allComments]);

  return { getAllComments, isGetCommentsLoading };
};

export default useGetAllComments;
