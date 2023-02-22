import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import { setCollectionsBySelectedUser } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';
import UserInfo from 'components/UserInfo/UserInfo';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function UserPage() {
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const userId = useAppSelector((state) => state.user.token?.id);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const collectionsBySelectedUser = useAppSelector(
    (state) => state.collection.collectionsBySelectedUser
  );
  const { t } = useTranslation('translation');
  const location = useLocation();
  const [getUserById, { data: currentUser, isSuccess: isSuccessGetUser }] =
    useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedUser) {
      const currentUserId = location.pathname.split('/')[2];
      (async () => {
        await getUserById(currentUserId);
      })();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (currentUser && isSuccessGetUser) {
      dispatch(setSelectedUser(currentUser));
    }
  }, [isSuccessGetUser]);

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
      <Button className="secondary-button mt-2" onClick={navigateToNewCollectionPage}>
        {t('profilePage.newCollection')}
      </Button>
      {collections && collections.length > 0 ? (
        <>
          <h3 className="mt-3 mb-3 text-center">
            {userId === selectedUser?._id
              ? t('profilePage.myCollections')
              : t('usersPage.collections')}
          </h3>
          <CollectionCardsContainer collections={collections} />
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
