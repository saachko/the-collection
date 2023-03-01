import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setCustomFieldsInItem, setCustomFieldsValues } from 'redux/slices/itemSlice';

import CustomFieldsContainer from 'components/CustomFieldsContainer/CustomFieldsContainer';
import ItemCard from 'components/ItemCard/ItemCard';
import TagsContainer from 'components/TagsContainer/TagsContainer';

import useGetCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';
import useGetItemFromLocation from 'hooks/useGetItemFromLocation';
import useGetTagsToItem from 'hooks/useGetTagsToItem';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function ItemPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const navigate = useNavigate();
  useGetItemFromLocation();
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const { fieldsInCollection } = useGetCustomFieldsInCollection(
    selectedItem?.collectionId
  );
  const { tags } = useGetTagsToItem();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fieldsInCollection) {
      dispatch(setCustomFieldsInItem(fieldsInCollection));
      const itemFieldsValues = selectedItem
        ? [...selectedItem.customFields].map((field) => field.value)
        : [];
      dispatch(setCustomFieldsValues(itemFieldsValues));
    }
  }, [fieldsInCollection]);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <ItemCard item={selectedItem} />
      <TagsContainer tags={tags} />
      <CustomFieldsContainer fields={selectedItem?.customFields} />
    </div>
  );
}

export default ItemPage;
