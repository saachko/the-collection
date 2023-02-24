import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import {
  setCollectionsBySelectedUser,
  setSelectedCollection,
} from 'redux/slices/collectionSlice';
import { setCollectionsBySelectedUserSortingType } from 'redux/slices/sortSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ThemeFilter from 'components/FilterTools/ThemeFilter';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';
import UserInfo from 'components/UserInfo/UserInfo';

import { defaultSortButtons, sortByItemsQuantityButtons } from 'utils/constants';

import useGetUserFromLocation from 'hooks/useGetUserFromLocation';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function UserPage() {
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const userId = useAppSelector((state) => state.user.token?.id);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const collectionsSorting = useAppSelector(
    (state) => state.sort.collectionsBySelectedUserSorting
  );
  const collectionsBySelectedUser = useAppSelector(
    (state) => state.collection.collectionsBySelectedUser
  );
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useGetUserFromLocation(selectedUser);

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
      if (selectedUser) await getCollectionsByUser(selectedUser._id);
    })();
  }, [selectedUser]);

  useEffect(() => {
    if (collections && isSuccessGetCollections) {
      dispatch(setCollectionsBySelectedUser(collections));
    }
  }, [isSuccessGetCollections]);

  const navigateToNewCollectionPage = () => {
    dispatch(setSelectedCollection(null));
    navigate('/new-collection');
  };

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      <NavLink to="/users" className="link mb-2">
        {t('usersPage.return')}
      </NavLink>
      <UserInfo
        avatar={selectedUser?.avatar}
        username={selectedUser?.username}
        roles={selectedUser?.roles}
      />
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 mt-2 flex-lg-row flex-column">
        <Button className="secondary-button mt-2" onClick={navigateToNewCollectionPage}>
          {t('profilePage.newCollection')}
        </Button>
        <div className="d-flex justify-content-end align-items-center gap-3 mb-1 mt-1 flex-md-row flex-column">
          <ThemeFilter
            allCollections={collections || null}
            filteringList={collectionsBySelectedUser}
            setList={setCollectionsBySelectedUser}
          />
          <SortToolbar
            sortingCollectionsList={collectionsBySelectedUser}
            sortingType={collectionsSorting}
            sortButtons={[...sortByItemsQuantityButtons, ...defaultSortButtons]}
            setCollectionsList={setCollectionsBySelectedUser}
            setCollectionsSorting={setCollectionsBySelectedUserSortingType}
          />
        </div>
      </div>
      {collections && collections.length > 0 ? (
        <>
          <h3 className="mt-3 mb-3 text-center">
            {userId === selectedUser?._id
              ? t('profilePage.myCollections')
              : t('usersPage.collections')}
          </h3>
          <CollectionCardsContainer collections={collectionsBySelectedUser} />
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

export default UserPage;
