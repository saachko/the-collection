import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import clsx from 'clsx';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import ReactSelect from 'react-select';

import {
  setCollectionsThemeFilter,
  setDefaultCollectionsFilters,
} from 'redux/slices/filterSlice';
import { setDefaultCollectionsSorting } from 'redux/slices/sortSlice';

import { collectionThemes, selectStyles } from 'utils/constants';

import { useAppDispatch } from 'hooks/useRedux';

import { Collection, SelectOption } from 'ts/interfaces';

import styles from './FilterTools.module.scss';

interface ThemeFilterProps {
  allCollections: Collection[] | null;
  filteringList: Collection[] | null;
  setList: ActionCreatorWithPayload<Collection[] | null>;
  theme: string;
  setThemeFilter?: ActionCreatorWithPayload<string>;
  setDefaultFilters?: ActionCreatorWithoutPayload;
  setDefaultSorting?: ActionCreatorWithoutPayload;
}

function ThemeFilter({
  allCollections,
  filteringList,
  setList,
  theme,
  setThemeFilter,
  setDefaultFilters,
  setDefaultSorting,
}: ThemeFilterProps) {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const collectionThemeOptions: SelectOption[] = collectionThemes.map((value) => ({
    value,
    label: `${t(`collections.${value}`)}`,
  }));

  useEffect(() => {
    if (theme) {
      const filteredCollections = filteringList?.filter(
        (collection) => collection.theme === theme
      );
      if (filteredCollections?.length === 0) {
        const filteredAllCollections = allCollections?.filter(
          (collection) => collection.theme === theme
        );
        dispatch(setList(filteredAllCollections || null));
        return;
      }
      dispatch(setList(filteredCollections || null));
    }
  }, [theme]);

  const resetFilters = () => {
    dispatch((setDefaultFilters || setDefaultCollectionsFilters)());
    dispatch((setDefaultSorting || setDefaultCollectionsSorting)());
    dispatch(setList(allCollections));
  };

  const getValueFromOption = (value: string) =>
    value ? collectionThemeOptions.find((option) => option.value === value) : '';

  return (
    <div className="d-flex">
      <button
        type="button"
        onClick={resetFilters}
        className={styles.resetCollectionsFilter}
      >
        <GrFormClose />
      </button>
      <ReactSelect
        options={collectionThemeOptions}
        placeholder={t('collections.themePlaceholder')}
        value={getValueFromOption(theme)}
        onChange={(value) =>
          dispatch(
            (setThemeFilter || setCollectionsThemeFilter)((value as SelectOption).value)
          )
        }
        styles={selectStyles}
        className={clsx('react-select-container', styles.themeFilter)}
        classNamePrefix="react-select"
      />
    </div>
  );
}

ThemeFilter.defaultProps = {
  setThemeFilter: setCollectionsThemeFilter,
  setDefaultFilters: setDefaultCollectionsFilters,
  setDefaultSorting: setDefaultCollectionsSorting,
};

export default memo(ThemeFilter);
