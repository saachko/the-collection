import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLazyGetAllCollectionsQuery } from 'redux/api/collectionApiSlice';
import { setCollections } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function CollectionsPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const collections = useAppSelector((state) => state.collection.collections);
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const dispatch = useAppDispatch();

  const [
    getAllCollections,
    {
      data: allCollections,
      isSuccess: isSuccessGetCollections,
      isLoading: isGetCollectionsLoading,
    },
  ] = useLazyGetAllCollectionsQuery();

  useEffect(() => {
    (async () => {
      await getAllCollections();
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    if (allCollections && isSuccessGetCollections) {
      dispatch(setCollections(allCollections));
    }
  }, [isSuccessGetCollections]);

  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      {allCollections ? (
        <CollectionCardsContainer collections={collections} />
      ) : (
        <EmptyContainer
          title={t('empty')}
          text={isLoggedIn ? `${t('emptyAndLoggedIn')}` : `${t('emptyAndLoggedOut')}`}
        />
      )}
    </div>
  );
}

export default memo(CollectionsPage);
