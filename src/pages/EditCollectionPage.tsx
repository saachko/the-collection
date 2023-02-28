import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CollectionEditForm from 'components/CollectionEditForm/CollectionEditForm';
import Loader from 'components/Loader/Loader';

import { useAppSelector } from 'hooks/useRedux';

function EditCollectionPage() {
  const [isCollectionDataLoading, setCollectionDataLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, user, isLoggedIn } = useAppSelector((state) => state.user);
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );

  useEffect(() => {
    if (selectedCollection && user) {
      if ((isAdmin && isLoggedIn) || selectedCollection.ownerId === user._id) {
        setCollectionDataLoading(false);
      } else {
        navigate('/');
      }
    } else {
      navigate(location.pathname.slice(0, -5));
    }
  }, [selectedCollection, user]);

  return (
    <div className="content">
      {isCollectionDataLoading && <Loader />}
      <CollectionEditForm />
    </div>
  );
}

export default memo(EditCollectionPage);
