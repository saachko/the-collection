import { useEffect } from 'react';

import { useLazyGetAllCommentsQuery } from 'redux/api/commentApiSlice';
import { setAllComments } from 'redux/slices/searchSlice';

import { meiliSearchClient } from 'utils/constants';

import { useAppDispatch } from './useRedux';

const useGetAllComments = () => {
  const dispatch = useAppDispatch();
  const index = meiliSearchClient.index('comments');

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
        const comments = allComments.map((element, ind) => ({ id: ind, element }));
        await index.addDocuments(comments);
      })();
      dispatch(setAllComments(allComments));
    }
  }, [allComments]);

  return { isGetCommentsLoading };
};

export default useGetAllComments;
