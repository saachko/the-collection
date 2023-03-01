import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { setSelectedItem } from 'redux/slices/itemSlice';

import ItemCard from 'components/ItemCard/ItemCard';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { Item } from 'ts/interfaces';

import styles from './ItemsSection.module.scss';

function ItemsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const lastAddedItems = useAppSelector((state) => state.item.lastAddedItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectItem = (item: Item) => {
    dispatch(setSelectedItem(item));
    navigate(`/items/${item._id}`);
  };

  return (
    <section className={styles.section}>
      <h2 className="m-0 align-self-start">{t('lastItems')}</h2>
      {lastAddedItems &&
        lastAddedItems.map((item) => (
          <span
            key={item._id}
            onClick={() => selectItem(item)}
            className={styles.link}
            aria-hidden="true"
          >
            <div className={styles.card}>
              <ItemCard item={item} />
            </div>
          </span>
        ))}
    </section>
  );
}

export default memo(ItemsSection);
