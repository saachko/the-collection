import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import ModalAuth from 'components/ModalAuth/ModalAuth';

import useCheckUserOnAppStart from 'hooks/useCheckUserOnAppStart';
import { useAppSelector } from 'hooks/useRedux';

const HomePage = lazy(() => import('pages/HomePage'));
const CollectionsPage = lazy(() => import('pages/CollectionsPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const UsersPage = lazy(() => import('pages/UsersPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function App() {
  const { isShown: isModalAuthShown } = useAppSelector((state) => state.authModal);
  const { isGetUserLoading } = useCheckUserOnAppStart();

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        {isGetUserLoading && <Loader />}
        <main>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
      <Footer />
      {isModalAuthShown && <ModalAuth />}
    </>
  );
}

export default App;
