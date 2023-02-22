import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useLazyGetCollectionByIdQuery } from 'redux/api/collectionApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import CollectionInfo from 'components/CollectionInfo/CollectionInfo';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function CollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const [
    getCollectionById,
    { data: currentCollection, isSuccess: isSuccessGetCollection },
  ] = useLazyGetCollectionByIdQuery();

  useEffect(() => {
    if (!selectedCollection) {
      const currentCollectionId = location.pathname.split('/')[2];
      (async () => {
        await getCollectionById(currentCollectionId);
      })();
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (currentCollection && isSuccessGetCollection) {
      dispatch(setSelectedCollection(currentCollection));
    }
  }, [isSuccessGetCollection]);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <CollectionInfo />
    </div>
  );
}

export default CollectionPage;
