import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback="LOADING...">
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <footer>Footer</footer>
    </>
  );
}

export default App;
