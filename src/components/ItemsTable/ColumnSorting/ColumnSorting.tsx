import clsx from 'clsx';
import React, { memo, useEffect } from 'react';
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from 'react-icons/hi2';

import { setItems } from 'redux/slices/itemSlice';
import { setEmptyItemsSorting } from 'redux/slices/sortSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { CustomField, Item } from 'ts/interfaces';
import { SetState } from 'ts/types';

import styles from './ColumnSorting.module.scss';

interface ColumnSortingProps {
  items: Item[] | null;
  field: CustomField;
  activeAsc: string;
  setActiveAsc: SetState<string>;
  activeDesc: string;
  setActiveDesc: SetState<string>;
}

function ColumnSorting({
  items,
  field,
  activeAsc,
  setActiveAsc,
  activeDesc,
  setActiveDesc,
}: ColumnSortingProps) {
  const itemsSorting = useAppSelector((state) => state.sort.itemsSorting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemsSorting) {
      setActiveAsc('');
      setActiveDesc('');
    }
  }, [itemsSorting]);

  const sortAscending = () => {
    if (items) {
      const list = [...items].sort((a, b) => {
        const aField = a.customFields.find((elem) => elem.customFieldId === field._id);
        const bField = b.customFields.find((elem) => elem.customFieldId === field._id);
        if (aField === undefined || bField === undefined) {
          return 0;
        }
        switch (field.type) {
          case 'number':
            return Number(aField.value) - Number(bField.value);
          case 'date':
            return Date.parse(bField.value) - Date.parse(aField.value);
          default:
            return aField.value > bField.value ? 1 : -1;
        }
      });
      dispatch(setEmptyItemsSorting());
      dispatch(setItems(list));
      setActiveAsc(field._id);
      setActiveDesc('');
    }
  };

  const sortDescending = () => {
    if (items && items) {
      const list = [...items].sort((a, b) => {
        const aField = a.customFields.find((elem) => elem.customFieldId === field._id);
        const bField = b.customFields.find((elem) => elem.customFieldId === field._id);
        if (aField === undefined || bField === undefined) {
          return 0;
        }
        switch (field.type) {
          case 'number':
            return Number(bField.value) - Number(aField.value);
          case 'date':
            return Date.parse(aField.value) - Date.parse(bField.value);
          default:
            return aField.value < bField.value ? 1 : -1;
        }
      });
      dispatch(setEmptyItemsSorting());
      dispatch(setItems(list));
      setActiveDesc(field._id);
      setActiveAsc('');
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={sortAscending}
        className={clsx({ [styles.active]: activeAsc === field._id })}
        disabled={activeAsc === field._id}
      >
        <HiOutlineArrowLongDown />
      </button>
      <button
        type="button"
        onClick={sortDescending}
        className={clsx({ [styles.active]: activeDesc === field._id })}
        disabled={activeDesc === field._id}
      >
        <HiOutlineArrowLongUp />
      </button>
    </div>
  );
}

export default memo(ColumnSorting);
