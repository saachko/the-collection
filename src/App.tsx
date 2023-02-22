import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { setCollectionCreated } from 'redux/slices/successNotificationSlice';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import ModalAuth from 'components/ModalAuth/ModalAuth';
import Notification from 'components/Notification/Notification';

import useCheckUserOnAppStart from 'hooks/useCheckUserOnAppStart';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const HomePage = lazy(() => import('pages/HomePage'));
const CollectionsPage = lazy(() => import('pages/CollectionsPage'));
const NewCollectionPage = lazy(() => import('pages/NewCollectionPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const UsersPage = lazy(() => import('pages/UsersPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function App() {
  const isModalAuthShown = useAppSelector((state) => state.authModal.isShown);
  const isCollectionCreated = useAppSelector(
    (state) => state.successNotification.isCollectionCreated
  );
  const { isGetUserLoading } = useCheckUserOnAppStart();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCollectionCreated) navigate(-1);
  }, [isCollectionCreated]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        {isGetUserLoading && <Loader />}
        <main>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="new-collection" element={<NewCollectionPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:userId" element={<UserPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Notification
          message="collections.creationSuccess"
          closeNotification={() => dispatch(setCollectionCreated(false))}
          isShown={isCollectionCreated}
          variant="primary"
        />
      </Suspense>
      <Footer />
      {isModalAuthShown && <ModalAuth />}
    </>
  );
}

export default App;
