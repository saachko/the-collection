import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import {
  setCollectionsByUser,
  setSelectedCollection,
} from 'redux/slices/collectionSlice';
import {
  setCollectionsByUserThemeFilter,
  setDefaultCollectionsByUserFilters,
} from 'redux/slices/filterSlice';
import {
  setCollectionsByUserSortingType,
  setDefaultCollectionsByUserSorting,
} from 'redux/slices/sortSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ThemeFilter from 'components/FilterTools/ThemeFilter';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';

import { defaultSortButtons, sortByItemsQuantityButtons } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import UserInfo from '../components/UserInfo/UserInfo';

function ProfilePage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const collectionsByUser = useAppSelector((state) => state.collection.collectionsByUser);
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.filter.collectionsByUserThemeFilter);
  const collectionsSorting = useAppSelector(
    (state) => state.sort.collectionsByUserSorting
  );

  const [
    getCollectionsByUser,
    {
      data: collections,
      isSuccess: isSuccessGetCollections,
      isLoading: isGetCollectionsLoading,
    },
  ] = useLazyGetCollectionsByUserIdQuery();

  useEffect(() => {
    (async () => {
      if (user) await getCollectionsByUser(user._id);
    })();
  }, [user]);

  useEffect(() => {
    if (collections && isSuccessGetCollections) {
      dispatch(setCollectionsByUser(collections));
    }
  }, [isSuccessGetCollections]);

  const navigateToNewCollectionPage = () => {
    dispatch(setSelectedUser(null));
    dispatch(setSelectedCollection(null));
    navigate('/new-collection');
  };

  useEffect(
    () => () => {
      dispatch(setDefaultCollectionsByUserFilters());
      dispatch(setDefaultCollectionsByUserSorting());
    },
    []
  );

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      <UserInfo avatar={user?.avatar} username={user?.username} roles={user?.roles} />
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 mt-2 flex-lg-row flex-column">
        <Button className="secondary-button mt-2" onClick={navigateToNewCollectionPage}>
          {t('profilePage.newCollection')}
        </Button>
        <div className="d-flex justify-content-end align-items-center gap-3 mb-1 mt-1 flex-md-row flex-column">
          <ThemeFilter
            allCollections={collections || null}
            filteringList={collectionsByUser}
            setList={setCollectionsByUser}
            setThemeFilter={setCollectionsByUserThemeFilter}
            setDefaultFilters={setDefaultCollectionsByUserFilters}
            setDefaultSorting={setDefaultCollectionsByUserSorting}
            theme={theme}
          />
          <SortToolbar
            sortingCollectionsList={collectionsByUser}
            sortingType={collectionsSorting}
            sortButtons={[...sortByItemsQuantityButtons, ...defaultSortButtons]}
            setCollectionsList={setCollectionsByUser}
            setCollectionsSorting={setCollectionsByUserSortingType}
          />
        </div>
      </div>
      {collections && collections.length > 0 ? (
        <>
          <h3 className="mt-3 mb-3 text-center">{t('profilePage.myCollections')}</h3>
          <CollectionCardsContainer collections={collectionsByUser} />
        </>
      ) : (
        <EmptyContainer
          title={t('collections.empty')}
          text={t('collections.emptyAndLoggedIn')}
        />
      )}
    </div>
  );
}

export default memo(ProfilePage);
