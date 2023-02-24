import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortTypes } from 'ts/types';

interface SortState {
  usersSorting: SortTypes;
  collectionsSorting: SortTypes;
  collectionsByUserSorting: SortTypes;
  collectionsBySelectedUserSorting: SortTypes;
}

const initialState: SortState = {
  usersSorting: 'fromNewToOld',
  collectionsSorting: 'fromNewToOld',
  collectionsByUserSorting: 'fromNewToOld',
  collectionsBySelectedUserSorting: 'fromNewToOld',
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
  },
});

export const {
  setUsersSortingType,
  setCollectionsSortingType,
  setCollectionsByUserSortingType,
  setCollectionsBySelectedUserSortingType,
  setDefaultUsersSorting,
  setDefaultCollectionsSorting,
  setDefaultCollectionsByUserSorting,
  setDefaultCollectionsBySelectedUserSorting,
} = sortSlice.actions;

export default sortSlice.reducer;
