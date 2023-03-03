import { useEffect } from 'react';

import { useLazyGetAllCommentsQuery } from 'redux/api/commentApiSlice';
import { setAllComments, setMeilisearchComments } from 'redux/slices/searchSlice';

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
        const comments = allComments.map((element, ind) => ({ id: `${ind}`, element }));
        dispatch(setMeilisearchComments(comments));
        await commentsIndex.addDocuments(comments);
      })();
      dispatch(setAllComments(allComments));
    }
  }, [allComments]);

  return { isGetCommentsLoading };
};

export default useGetAllComments;
