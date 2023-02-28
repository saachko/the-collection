import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import CustomFieldsContainer from 'components/CustomFieldsContainer/CustomFieldsContainer';
import ItemCard from 'components/ItemCard/ItemCard';
import TagsContainer from 'components/TagsContainer/TagsContainer';

import useGetItemFromLocation from 'hooks/useGetItemFromLocation';
import useGetTagsToItem from 'hooks/useGetTagsToItem';
import { useAppSelector } from 'hooks/useRedux';

function ItemPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const navigate = useNavigate();
  useGetItemFromLocation();
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const { tags } = useGetTagsToItem();

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