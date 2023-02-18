import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import clsx from 'clsx';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { sortButtons } from 'utils/constants';
import { sortData } from 'utils/functions';

import { useAppDispatch } from 'hooks/useRedux';

import { User } from 'ts/interfaces';
import { SortTypes } from 'ts/types';

import styles from './SortToolbar.module.scss';

interface SortToolbarProps {
  sortingList: User[] | null;
  sortingType: SortTypes;
  setSortingType: ActionCreatorWithPayload<SortTypes>;
  setList: ActionCreatorWithPayload<User[] | null>;
}

function SortToolbar({
  sortingList,
  sortingType,
  setSortingType,
  setList,
}: SortToolbarProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'sort' });
  const dispatch = useAppDispatch();

  const changeSortingType = (type: SortTypes) => {
    dispatch(setSortingType(type));
    const sortedData = sortData(sortingList, type);
    dispatch(setList(sortedData));
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

export default SortToolbar;
