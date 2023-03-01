import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteCollectionByIdMutation } from 'redux/api/collectionApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import { SetState } from 'ts/types';

import { useAppDispatch } from './useRedux';

const useDeleteCollection = (
  setDeleteErrorShown: SetState<boolean>,
  collectionId: string | undefined
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    deleteCollectionById,
    {
      isSuccess: isSuccessDeleteCollection,
      isLoading: isDeleteCollectionLoading,
      isError: isDeleteCollectionError,
    },
  ] = useDeleteCollectionByIdMutation();

  const deleteCollection = async () => {
    if (collectionId) {
      await deleteCollectionById(collectionId);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteCollection) {
      navigate('/collections');
      dispatch(setSelectedCollection(null));
    }
  }, [isSuccessDeleteCollection]);

  useEffect(() => {
    if (isDeleteCollectionError) {
      setDeleteErrorShown(true);
    }
  }, [isDeleteCollectionError]);

  return { deleteCollection, isDeleteCollectionLoading };
};

export default useDeleteCollection;
