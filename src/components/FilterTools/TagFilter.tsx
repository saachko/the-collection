import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import ReactSelect from 'react-select';

import { setFilterTag, setItemsFilteredByTag } from 'redux/slices/filterSlice';

import { selectStyles } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { SelectOption } from 'ts/interfaces';

import styles from './FilterTools.module.scss';

function TagFilter() {
  const { t } = useTranslation('translation', { keyPrefix: 'filter' });
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.tag.allTags);
  const filterTag = useAppSelector((state) => state.filter.filterTag);
  const allItems = useAppSelector((state) => state.search.allItems);
  const tagOptions: SelectOption[] =
    allTags?.map((tag) => ({
      value: tag._id,
      label: tag.label,
    })) || [];

  const getValueFromOption = (value: string) =>
    value ? tagOptions.find((option) => option.value === value) : '';

  useEffect(() => {
    if (filterTag && allItems && allTags) {
      const tag = allTags.find((elem) => elem._id === filterTag);
      if (tag) {
        const filteredItems = allItems.filter((item) => tag.items.includes(item._id));
        dispatch(setItemsFilteredByTag(filteredItems));
      }
    }
  }, [filterTag]);

  const resetFilterTag = () => {
    dispatch(setFilterTag(''));
    dispatch(setItemsFilteredByTag([]));
  };

  return (
    <div className={styles.tagFilterWrapper}>
      <button
        type="button"
        onClick={resetFilterTag}
        className={styles.resetCollectionsFilter}
      >
        <GrFormClose />
      </button>
      <ReactSelect
        options={tagOptions}
        placeholder={t('tagPlaceholder')}
        value={getValueFromOption(filterTag)}
        onChange={(value) => dispatch(setFilterTag((value as SelectOption).value))}
        styles={selectStyles}
        className={clsx('react-select-container', styles.tagFilter)}
        classNamePrefix="react-select"
        noOptionsMessage={() => `${t('noOptions')}`}
      />
    </div>
  );
}

export default TagFilter;
