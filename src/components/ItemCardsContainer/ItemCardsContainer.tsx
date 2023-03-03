import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { setSelectedItem } from 'redux/slices/itemSlice';

import ItemCard from 'components/ItemCard/ItemCard';

import { useAppDispatch } from 'hooks/useRedux';

import { Item } from 'ts/interfaces';

import styles from './ItemCardsContainer.module.scss';

interface ItemCardsContainerProps {
  items: Item[];
}

function ItemCardsContainer({ items }: ItemCardsContainerProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectItem = (item: Item) => {
    dispatch(setSelectedItem(item));
    navigate(`/items/${item._id}`);
  };

  return (
    <div className="d-flex flex-column gap-3 align-items-center w-100">
      {items.map((item) => (
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
    </div>
  );
}

export default memo(ItemCardsContainer);
