import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { setCollections } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ThemeFilter from 'components/FilterTools/ThemeFilter';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';

import { defaultSortButtons, sortByItemsQuantityButtons } from 'utils/constants';

import useGetAllCollections from 'hooks/useGetAllCollections';
import { useAppSelector } from 'hooks/useRedux';

function CollectionsPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const collections = useAppSelector((state) => state.collection.collections);
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const { allCollections, theme, isGetCollectionsLoading, collectionsSorting } =
    useGetAllCollections();

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
              theme={theme}
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
