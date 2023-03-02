import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
  usersFilterAdmins: boolean;
  usersFilterBlocked: boolean;
  collectionsThemeFilter: string;
  collectionsByUserThemeFilter: string;
  collectionsBySelectedUserThemeFilter: string;
  searchValue: string;
  offcanvasShown: boolean;
}

const initialState: FilterState = {
  usersFilterAdmins: false,
  usersFilterBlocked: false,
  collectionsThemeFilter: '',
  collectionsByUserThemeFilter: '',
  collectionsBySelectedUserThemeFilter: '',
  searchValue: '',
  offcanvasShown: false,
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

    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },

    setOffcanvasShown(state, { payload }: PayloadAction<boolean>) {
      state.offcanvasShown = payload;
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
  setSearchValue,
  setOffcanvasShown,
} = filterSlice.actions;

export default filterSlice.reducer;
