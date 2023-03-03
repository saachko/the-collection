import React, { memo } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setCustomFieldsInItem, setSelectedItem } from 'redux/slices/itemSlice';
import { setTagsFromInput } from 'redux/slices/tagSlice';

import CollectionInfo from 'components/CollectionInfo/CollectionInfo';
import CsvButton from 'components/CsvButton/CsvButton';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import ItemsTable from 'components/ItemsTable/ItemsTable';
import Loader from 'components/Loader/Loader';
import SortToolbar from 'components/SortToolbar/SortToolbar';

import { defaultSortButtons, sortByLikesButtons } from 'utils/constants';

import useGetCollectionFromLocation from 'hooks/useGetCollectionFromLocation';
import useGetCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';
import useGetItemsInCollection from 'hooks/useGetItemsInCollection';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function CollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useGetCollectionFromLocation();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const itemsSorting = useAppSelector((state) => state.sort.itemsSorting);
  const { isAdmin, user, isLoggedIn } = useAppSelector((state) => state.user);
  const { items, isLoadingItems } = useGetItemsInCollection(selectedCollection?._id);
  const { fieldsInCollection } = useGetCustomFieldsInCollection(selectedCollection?._id);

  const navigateToNewItemPage = () => {
    dispatch(setTagsFromInput([]));
    dispatch(setCustomFieldsInItem(fieldsInCollection || []));
    dispatch(setSelectedItem(null));
    navigate(`/collections/${selectedCollection?._id}/new-item`);
  };

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <CollectionInfo />
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 mt-2 flex-lg-row flex-column">
        <ButtonToolbar className="justify-content-center gap-2 mt-4 mb-3">
          {((isAdmin && isLoggedIn) || user?._id === selectedCollection?.ownerId) && (
            <Button className="secondary-button mt-2" onClick={navigateToNewItemPage}>
              {t('newItem')}
            </Button>
          )}
          <CsvButton />
        </ButtonToolbar>
        {items && items.length > 0 && (
          <div className="d-flex justify-content-end align-items-center mb-1 mt-1">
            <SortToolbar
              sortingItemsList={items}
              sortingType={itemsSorting}
              sortButtons={[...sortByLikesButtons, ...defaultSortButtons]}
            />
          </div>
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
