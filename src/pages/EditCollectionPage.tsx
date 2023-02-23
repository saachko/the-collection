import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';

import { useAppSelector } from 'hooks/useRedux';

import CollectionFormPage from './CollectionFormPage';

function EditCollectionPage() {
  const [isCollectionDataLoading, setCollectionDataLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, user } = useAppSelector((state) => state.user);
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );

  useEffect(() => {
    if (selectedCollection && user) {
      if (isAdmin || selectedCollection.ownerId === user._id) {
        setCollectionDataLoading(false);
      } else {
        navigate('/');
      }
    } else {
      navigate(location.pathname.slice(0, -5));
    }
  }, [selectedCollection, user]);

  return (
    <>
      {isCollectionDataLoading && <Loader />}
      <CollectionFormPage />
    </>
  );
}

export default EditCollectionPage;
