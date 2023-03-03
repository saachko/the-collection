import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

import ItemEditForm from 'components/ItemEditForm/ItemEditForm';

import useGetCollectionFromLocation from 'hooks/useGetCollectionFromLocation';
import { useAppSelector } from 'hooks/useRedux';

function NewItemPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  useGetCollectionFromLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <ItemEditForm />
    </div>
  );
}

export default memo(NewItemPage);
