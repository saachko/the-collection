import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useLazyGetCollectionsByUserIdQuery } from 'redux/api/collectionApiSlice';
import { setCollectionsByUser } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import UserInfo from '../components/UserInfo/UserInfo';

interface ProfilePageProps {
  isUserLoading: boolean;
}

function ProfilePage({ isUserLoading }: ProfilePageProps) {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const collectionsByUser = useAppSelector((state) => state.collection.collectionsByUser);
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

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

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {isGetCollectionsLoading && <Loader />}
      <UserInfo
        avatar={user?.avatar}
        username={user?.username}
        roles={user?.roles}
        isUserLoading={isUserLoading}
      />

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
