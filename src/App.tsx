import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { setLoggedIn, setToken, setUser } from 'redux/slices/userSlice';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import ModalAuth from 'components/ModalAuth/ModalAuth';

import checkToken from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const HomePage = lazy(() => import('pages/HomePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const CollectionsPage = lazy(() => import('pages/CollectionsPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));

function App() {
  const { isShown: isModalAuthShown } = useAppSelector((state) => state.authModal);
  const { token } = useAppSelector((state) => state.user);
  const [
    getUserById,
    { data: currentUser, isSuccess: isSuccessGetUser, status: getUserStatus },
  ] = useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token?.token) {
      const idFromToken = checkToken(token.token);
      if (idFromToken && idFromToken === token.id) {
        (async () => {
          await getUserById(idFromToken);
        })();
        dispatch(setLoggedIn(true));
      }
    }
  }, []);

  useEffect(() => {
    if (getUserStatus === 'fulfilled' && currentUser && isSuccessGetUser) {
      dispatch(setUser(currentUser));
    }
    if (getUserStatus === 'rejected') {
      dispatch(setLoggedIn(false));
      dispatch(setToken(null));
    }
  }, [getUserStatus]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
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
