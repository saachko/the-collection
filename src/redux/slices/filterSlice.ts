import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Item } from 'ts/interfaces';

interface FilterState {
  usersFilterAdmins: boolean;
  usersFilterBlocked: boolean;
  collectionsThemeFilter: string;
  collectionsByUserThemeFilter: string;
  collectionsBySelectedUserThemeFilter: string;
  filterTag: string;
  itemsFilteredByTag: Item[];
}

const initialState: FilterState = {
  usersFilterAdmins: false,
  usersFilterBlocked: false,
  collectionsThemeFilter: '',
  collectionsByUserThemeFilter: '',
  collectionsBySelectedUserThemeFilter: '',
  filterTag: '',
  itemsFilteredByTag: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setUsersFilterAdmins(state, { payload }: PayloadAction<boolean>) {
      state.usersFilterAdmins = payload;
    },

    setUsersFilterBlocked(state, { payload }: PayloadAction<boolean>) {
      state.usersFilterBlocked = payload;
    },

    setCollectionsThemeFilter(state, { payload }: PayloadAction<string>) {
      state.collectionsThemeFilter = payload;
    },

    setCollectionsByUserThemeFilter(state, { payload }: PayloadAction<string>) {
      state.collectionsByUserThemeFilter = payload;
    },

    setCollectionsBySelectedUserThemeFilter(state, { payload }: PayloadAction<string>) {
      state.collectionsBySelectedUserThemeFilter = payload;
    },

    setDefaultUsersFilters(state) {
      state.usersFilterAdmins = false;
      state.usersFilterBlocked = false;
    },

    setDefaultCollectionsFilters(state) {
      state.collectionsThemeFilter = '';
    },

    setDefaultCollectionsByUserFilters(state) {
      state.collectionsByUserThemeFilter = '';
    },

    setDefaultCollectionsBySelectedUserFilters(state) {
      state.collectionsBySelectedUserThemeFilter = '';
    },

    setFilterTag(state, { payload }: PayloadAction<string>) {
      state.filterTag = payload;
    },

    setItemsFilteredByTag(state, { payload }: PayloadAction<Item[]>) {
      state.itemsFilteredByTag = payload;
    },
  },
});

export const {
  setUsersFilterAdmins,
  setUsersFilterBlocked,
  setCollectionsThemeFilter,
  setCollectionsByUserThemeFilter,
  setCollectionsBySelectedUserThemeFilter,
  setDefaultUsersFilters,
  setDefaultCollectionsFilters,
  setDefaultCollectionsByUserFilters,
  setDefaultCollectionsBySelectedUserFilters,
  setFilterTag,
  setItemsFilteredByTag,
} = filterSlice.actions;

export default filterSlice.reducer;
