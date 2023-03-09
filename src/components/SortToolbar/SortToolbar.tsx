import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import clsx from 'clsx';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setUsers } from 'redux/slices/adminSlice';
import { setCollections } from 'redux/slices/collectionSlice';
import { setItems } from 'redux/slices/itemSlice';
import {
  setCollectionsSortingType,
  setItemsSortingType,
  setUsersSortingType,
} from 'redux/slices/sortSlice';

import { sortData } from 'utils/functions';

import { useAppDispatch } from 'hooks/useRedux';

import { Collection, Item, SortButton, User } from 'ts/interfaces';
import { SortTypes } from 'ts/types';

import styles from './SortToolbar.module.scss';

interface SortToolbarProps {
  sortingUserList?: User[] | null;
  sortingCollectionsList?: Collection[] | null;
  sortingItemsList?: Item[] | null;
  sortingType: SortTypes;
  sortButtons: SortButton[];
  setCollectionsList?: ActionCreatorWithPayload<Collection[] | null>;
  setCollectionsSorting?: ActionCreatorWithPayload<SortTypes>;
}

function SortToolbar({
  sortingUserList,
  sortingCollectionsList,
  sortingItemsList,
  sortingType,
  sortButtons,
  setCollectionsList,
  setCollectionsSorting,
}: SortToolbarProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'sort' });
  const dispatch = useAppDispatch();

  const changeSortingType = (type: SortTypes) => {
    const sortedData = sortData(
      type,
      sortingUserList,
      sortingCollectionsList,
      sortingItemsList
    );
    if (sortingUserList) {
      dispatch(setUsersSortingType(type));
      dispatch(setUsers(sortedData as User[] | null));
    }
    if (sortingCollectionsList) {
      dispatch((setCollectionsSorting || setCollectionsSortingType)(type));
      dispatch((setCollectionsList || setCollections)(sortedData as Collection[] | null));
    }
    if (sortingItemsList) {
      dispatch(setItemsSortingType(type));
      dispatch(setItems(sortedData as Item[] | null));
    }
  };

  return (
    <div className="d-flex justify-content-end gap-3">
      {sortButtons.map((action) => (
        <OverlayTrigger
          key={action.id}
          placement="bottom"
          overlay={<Tooltip>{t(action.tooltip)}</Tooltip>}
        >
          <button
            type="button"
            className={clsx(styles.sortButton, {
              [styles.sortButtonActive]: sortingType === action.id,
            })}
            onClick={() => changeSortingType(action.id)}
          >
            {action.icon}
          </button>
        </OverlayTrigger>
      ))}
    </div>
  );
}

SortToolbar.defaultProps = {
  sortingUserList: null,
  sortingCollectionsList: null,
  sortingItemsList: null,
  setCollectionsList: setCollections,
  setCollectionsSorting: setCollectionsSortingType,
};

export default SortToolbar;
