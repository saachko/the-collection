import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import CollectionInfo from 'components/CollectionInfo/CollectionInfo';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ItemsTable from 'components/ItemsTable/ItemsTable';
import Loader from 'components/Loader/Loader';

import useGetCollectionFromLocation from 'hooks/useGetCollectionFromLocation';
import useGetItemsInCollection from 'hooks/useGetItemsInCollection';
import { useAppSelector } from 'hooks/useRedux';

function CollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const navigate = useNavigate();
  useGetCollectionFromLocation();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const userId = useAppSelector((state) => state.user.token?.id);
  const { items, isLoadingItems } = useGetItemsInCollection(selectedCollection?._id);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <CollectionInfo />
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 mt-2 flex-lg-row flex-column">
        {(isAdmin || userId === selectedCollection?.ownerId) && (
          <Button
            className="secondary-button mt-2"
            onClick={() => navigate(`/collections/${selectedCollection?._id}/new-item`)}
          >
            {t('newItem')}
          </Button>
        )}
      </div>
      {items && items.length > 0 ? (
        <ItemsTable items={items} />
      ) : (
        <EmptyContainer title={t('empty')} text="" />
      )}
      {isLoadingItems && <Loader />}
    </div>
  );
}

export default memo(CollectionPage);
