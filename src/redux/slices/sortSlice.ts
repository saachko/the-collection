import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortTypes } from 'ts/types';

interface SortState {
  usersSorting: SortTypes;
  collectionsSorting: SortTypes;
  collectionsBySelectedUserSorting: SortTypes;
}

const initialState: SortState = {
  usersSorting: 'fromNewToOld',
  collectionsSorting: 'fromNewToOld',
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

    setDefaultCollectionsBySelectedUserSorting(state) {
      state.collectionsBySelectedUserSorting = 'fromNewToOld';
    },
  },
});

export const {
  setUsersSortingType,
  setCollectionsSortingType,
  setCollectionsBySelectedUserSortingType,
  setDefaultUsersSorting,
  setDefaultCollectionsSorting,
  setDefaultCollectionsBySelectedUserSorting,
} = sortSlice.actions;

export default sortSlice.reducer;
