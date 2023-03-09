import clsx from 'clsx';
import React, { useEffect } from 'react';
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from 'react-icons/hi2';

import { setItems } from 'redux/slices/itemSlice';
import { setEmptyItemsSorting } from 'redux/slices/sortSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { CustomField, CustomFieldInItem, Item } from 'ts/interfaces';
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

  const removeSymbols = (text: string) => text.replace(/[^A-Za-zа-яА-ЯЁё0-9]/g, '');

  const sortAsc = (aField: CustomFieldInItem, bField: CustomFieldInItem) => {
    switch (field.type) {
      case 'number':
        return Number(aField.value) - Number(bField.value);
      case 'date':
        return Date.parse(bField.value) - Date.parse(aField.value);
      case 'text':
        return removeSymbols(aField.value) > removeSymbols(bField.value) ? 1 : -1;
      default:
        return aField.value > bField.value ? 1 : -1;
    }
  };

  const sortDesc = (aField: CustomFieldInItem, bField: CustomFieldInItem) =>
    -sortAsc(aField, bField);

  const sort = (
    func: (aField: CustomFieldInItem, bField: CustomFieldInItem) => number,
    a: Item,
    b: Item
  ) => {
    const aField = a.customFields.find((elem) => elem.customFieldId === field._id);
    const bField = b.customFields.find((elem) => elem.customFieldId === field._id);
    if (aField === undefined || bField === undefined) {
      return 0;
    }
    return func(aField, bField);
  };

  const setSortedList = (list: Item[], asc: string, desc: string) => {
    dispatch(setEmptyItemsSorting());
    dispatch(setItems(list));
    setActiveAsc(asc);
    setActiveDesc(desc);
  };

  const sortAscending = () => {
    if (items) {
      const list = [...items].sort((a, b) => sort(sortAsc, a, b));
      setSortedList(list, field._id, '');
    }
  };

  const sortDescending = () => {
    if (items && items) {
      const list = [...items].sort((a, b) => sort(sortDesc, a, b));
      setSortedList(list, '', field._id);
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

export default ColumnSorting;
