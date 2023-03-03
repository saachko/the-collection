import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  setCollectionCreated,
  setItemCreated,
} from 'redux/slices/successNotificationSlice';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import ModalAuth from 'components/ModalAuth/ModalAuth';
import Notification from 'components/Notification/Notification';

import useCheckUserOnAppStart from 'hooks/useCheckUserOnAppStart';
import useGetAllCollections from 'hooks/useGetAllCollections';
import useGetAllComments from 'hooks/useGetAllComments';
import useGetAllItems from 'hooks/useGetAllItems';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const HomePage = lazy(() => import('pages/HomePage'));
const CollectionsPage = lazy(() => import('pages/CollectionsPage'));
const NewCollectionPage = lazy(() => import('pages/NewCollectionPage'));
const EditCollectionPage = lazy(() => import('pages/EditCollectionPage'));
const CollectionPage = lazy(() => import('pages/CollectionPage'));
const NewItemPage = lazy(() => import('pages/NewItemPage'));
const ItemPage = lazy(() => import('pages/ItemPage'));
const EditItemPage = lazy(() => import('pages/EditItemPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const UsersPage = lazy(() => import('pages/UsersPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const SearchPage = lazy(() => import('pages/SearchPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function App() {
  const isModalAuthShown = useAppSelector((state) => state.authModal.isShown);
  const { isCollectionCreated, isItemCreated } = useAppSelector(
    (state) => state.successNotification
  );
  const { isGetUserLoading } = useCheckUserOnAppStart();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isGetAllItemsLoading } = useGetAllItems();
  const { isGetCollectionsLoading } = useGetAllCollections();
  const { isGetCommentsLoading } = useGetAllComments();

  const isLoading =
    isGetUserLoading ||
    isGetAllItemsLoading ||
    isGetCollectionsLoading ||
    isGetCommentsLoading;

  useEffect(() => {
    if (isCollectionCreated || isItemCreated) navigate(-1);
  }, [isCollectionCreated, isItemCreated]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="new-collection" element={<NewCollectionPage />} />
            <Route path="collections/:collectionId" element={<CollectionPage />} />
            <Route
              path="collections/:collectionId/edit"
              element={<EditCollectionPage />}
            />
            <Route path="collections/:collectionId/new-item" element={<NewItemPage />} />
            <Route path="items/:itemId" element={<ItemPage />} />
            <Route path="items/:itemId/edit" element={<EditItemPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:userId" element={<UserPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Notification
          message="collections.creationSuccess"
          closeNotification={() => dispatch(setCollectionCreated(false))}
          isShown={isCollectionCreated}
          variant="primary"
        />
        <Notification
          message="items.creationSuccess"
          closeNotification={() => dispatch(setItemCreated(false))}
          isShown={isItemCreated}
          variant="primary"
        />
        {isLoading && <Loader />}
      </Suspense>
      <Footer />
      {isModalAuthShown && <ModalAuth />}
    </>
  );
}

export default App;
