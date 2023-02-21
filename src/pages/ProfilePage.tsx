import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';
import { setCollectionsByUser } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import UserInfo from '../components/UserInfo/UserInfo';

function ProfilePage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const collectionsByUser = useAppSelector((state) => state.collection.collectionsByUser);
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    navigate('/new-collection');
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      <UserInfo avatar={user?.avatar} username={user?.username} roles={user?.roles} />
      <Button className="secondary-button mt-2" onClick={navigateToNewCollectionPage}>
        {t('profilePage.newCollection')}
      </Button>
      {collections && collections.length > 0 ? (
        <>
          <h3 className="mt-3 mb-3 text-center">{t('profilePage.myCollections')}</h3>
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

export default memo(ProfilePage);
