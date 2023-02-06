import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback="LOADING...">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
