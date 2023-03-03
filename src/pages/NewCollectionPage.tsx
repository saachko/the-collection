import React from 'react';
import { Navigate } from 'react-router-dom';

import CollectionEditForm from 'components/CollectionEditForm/CollectionEditForm';

import { useAppSelector } from 'hooks/useRedux';

function NewCollectionPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <CollectionEditForm />
    </div>
  );
}

export default NewCollectionPage;
