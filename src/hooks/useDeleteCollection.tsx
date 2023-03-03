import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteCollectionByIdMutation } from 'redux/api/collectionApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import { collectionsIndex } from 'utils/constants';

import { SetState } from 'ts/types';

import { useAppDispatch, useAppSelector } from './useRedux';

const useDeleteCollection = (
  setDeleteErrorShown: SetState<boolean>,
  collectionId: string | undefined
) => {
  const meilisearchCollections = useAppSelector(
    (state) => state.search.meilisearchCollections
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    deleteCollectionById,
    {
      data: deletedCollection,
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
    if (deletedCollection && isSuccessDeleteCollection) {
      const meilisearchId = meilisearchCollections.filter(
        (meiliCollection) => meiliCollection.element._id === deletedCollection._id
      )[0].id;
      (async () => {
        await collectionsIndex.deleteDocument(meilisearchId);
      })();
      navigate('/collections');
      dispatch(setSelectedCollection(null));
    }
  }, [deletedCollection]);

  useEffect(() => {
    if (isDeleteCollectionError) {
      setDeleteErrorShown(true);
    }
  }, [isDeleteCollectionError]);

  return { deleteCollection, isDeleteCollectionLoading };
};

export default useDeleteCollection;
