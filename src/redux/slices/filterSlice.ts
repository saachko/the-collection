import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
  usersFilterAdmins: boolean;
  usersFilterBlocked: boolean;
}

const initialState: FilterState = {
  usersFilterAdmins: false,
  usersFilterBlocked: false,
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

    setDefaultFilters(state) {
      state.usersFilterAdmins = false;
      state.usersFilterBlocked = false;
    },
  },
});

export const { setUsersFilterAdmins, setUsersFilterBlocked, setDefaultFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
