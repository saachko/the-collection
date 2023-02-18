import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortTypes } from 'ts/types';

interface SortState {
  usersSorting: SortTypes;
}

const initialState: SortState = {
  usersSorting: 'fromNewToOld',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setUsersSortingType(state, { payload }: PayloadAction<SortTypes>) {
      state.usersSorting = payload;
    },

    setDefaultSorting(state) {
      state.usersSorting = 'fromNewToOld';
    },
  },
});

export const { setUsersSortingType, setDefaultSorting } = sortSlice.actions;

export default sortSlice.reducer;
