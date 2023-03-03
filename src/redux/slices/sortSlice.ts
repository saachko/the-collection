import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortTypes } from 'ts/types';

interface SortState {
  usersSorting: SortTypes;
  collectionsSorting: SortTypes;
  collectionsByUserSorting: SortTypes;
  collectionsBySelectedUserSorting: SortTypes;
  itemsSorting: SortTypes;
}

const initialState: SortState = {
  usersSorting: 'fromNewToOld',
  collectionsSorting: 'fromNewToOld',
  collectionsByUserSorting: 'fromNewToOld',
  collectionsBySelectedUserSorting: 'fromNewToOld',
  itemsSorting: 'fromNewToOld',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setUsersSortingType(state, { payload }: PayloadAction<SortTypes>) {
      state.usersSorting = payload;
    },

    setCollectionsSortingType(state, { payload }: PayloadAction<SortTypes>) {
      state.collectionsSorting = payload;
    },

    setCollectionsByUserSortingType(state, { payload }: PayloadAction<SortTypes>) {
      state.collectionsByUserSorting = payload;
    },

    setCollectionsBySelectedUserSortingType(
      state,
      { payload }: PayloadAction<SortTypes>
    ) {
      state.collectionsBySelectedUserSorting = payload;
    },

    setItemsSortingType(state, { payload }: PayloadAction<SortTypes>) {
      state.itemsSorting = payload;
    },

    setDefaultUsersSorting(state) {
      state.usersSorting = 'fromNewToOld';
    },

    setDefaultCollectionsSorting(state) {
      state.collectionsSorting = 'fromNewToOld';
    },

    setDefaultCollectionsByUserSorting(state) {
      state.collectionsByUserSorting = 'fromNewToOld';
    },

    setDefaultCollectionsBySelectedUserSorting(state) {
      state.collectionsBySelectedUserSorting = 'fromNewToOld';
    },

    setDefaultItemsSorting(state) {
      state.itemsSorting = 'fromNewToOld';
    },

    setEmptyItemsSorting(state) {
      state.itemsSorting = '';
    },
  },
});

export const {
  setUsersSortingType,
  setCollectionsSortingType,
  setCollectionsByUserSortingType,
  setCollectionsBySelectedUserSortingType,
  setItemsSortingType,
  setDefaultUsersSorting,
  setDefaultCollectionsSorting,
  setDefaultCollectionsByUserSorting,
  setDefaultCollectionsBySelectedUserSorting,
  setDefaultItemsSorting,
  setEmptyItemsSorting,
} = sortSlice.actions;

export default sortSlice.reducer;
