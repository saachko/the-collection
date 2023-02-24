import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
  usersFilterAdmins: boolean;
  usersFilterBlocked: boolean;
  collectionsThemeFilter: string;
}

const initialState: FilterState = {
  usersFilterAdmins: false,
  usersFilterBlocked: false,
  collectionsThemeFilter: '',
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

    setDefaultUsersFilters(state) {
      state.usersFilterAdmins = false;
      state.usersFilterBlocked = false;
    },

    setDefaultCollectionsFilters(state) {
      state.collectionsThemeFilter = '';
    },
  },
});

export const {
  setUsersFilterAdmins,
  setUsersFilterBlocked,
  setCollectionsThemeFilter,
  setDefaultUsersFilters,
  setDefaultCollectionsFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
