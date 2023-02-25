import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import CollectionInfo from 'components/CollectionInfo/CollectionInfo';
import ItemsTable from 'components/ItemsTable/ItemsTable';
import Loader from 'components/Loader/Loader';

import useGetCollectionFromLocation from 'hooks/useGetCollectionFromLocation';
import useGetItemsInCollection from 'hooks/useGetItemsInCollection';
import { useAppSelector } from 'hooks/useRedux';

function CollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const navigate = useNavigate();
  useGetCollectionFromLocation();
  const selectedCollectionId = useAppSelector(
    (state) => state.collection.selectedCollection?._id
  );
  const { items, isLoadingItems } = useGetItemsInCollection(selectedCollectionId);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <CollectionInfo />
      <ItemsTable items={items} />
      {isLoadingItems && <Loader />}
    </div>
  );
}

export default memo(CollectionPage);
