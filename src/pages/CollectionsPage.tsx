import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLazyGetAllCollectionsQuery } from 'redux/api/collectionApiSlice';
import { setCollections } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ThemeFilter from 'components/FilterTools/ThemeFilter';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';

import { defaultSortButtons, sortByItemsQuantityButtons } from 'utils/constants';
import { sortData } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { Collection } from 'ts/interfaces';

function CollectionsPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const collections = useAppSelector((state) => state.collection.collections);
  const collectionsSorting = useAppSelector((state) => state.sort.collectionsSorting);
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
      const sortedData = sortData(
        collectionsSorting,
        null,
        allCollections
      ) as Collection[];
      dispatch(setCollections(sortedData));
    }
  }, [isSuccessGetCollections]);

  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      {allCollections ? (
        <>
          <div className="d-flex justify-content-end align-items-center gap-3 mb-4 mt-2 flex-md-row flex-column">
            <ThemeFilter
              allCollections={allCollections}
              filteringList={collections}
              setList={setCollections}
            />
            <SortToolbar
              sortingCollectionsList={collections}
              sortingType={collectionsSorting}
              sortButtons={[...sortByItemsQuantityButtons, ...defaultSortButtons]}
            />
          </div>
          <CollectionCardsContainer collections={collections} />
        </>
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
