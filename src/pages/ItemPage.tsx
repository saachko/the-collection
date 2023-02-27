import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import ItemCard from 'components/ItemCard/ItemCard';

import useGetItemFromLocation from 'hooks/useGetItemFromLocation';
import { useAppSelector } from 'hooks/useRedux';

function ItemPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const navigate = useNavigate();
  useGetItemFromLocation();
  const selectedItem = useAppSelector((state) => state.item.selectedItem);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <ItemCard item={selectedItem} />
    </div>
  );
}

export default ItemPage;
