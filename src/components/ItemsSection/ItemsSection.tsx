import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { setSelectedItem } from 'redux/slices/itemSlice';

import ItemCard from 'components/ItemCard/ItemCard';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './ItemsSection.module.scss';

function ItemsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const lastAddedItems = useAppSelector((state) => state.item.lastAddedItems);
  const dispatch = useAppDispatch();

  return (
    <section className={styles.section}>
      <h2 className="m-0 align-self-start">{t('lastItems')}</h2>
      {lastAddedItems &&
        lastAddedItems.map((item) => (
          <NavLink
            key={item._id}
            to={`/items/${item._id}`}
            onClick={() => dispatch(setSelectedItem(item))}
            className={styles.link}
          >
            <div className={styles.card}>
              <ItemCard item={item} />
            </div>
          </NavLink>
        ))}
    </section>
  );
}

export default memo(ItemsSection);
