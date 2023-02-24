import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortTypes } from 'ts/types';

interface SortState {
  usersSorting: SortTypes;
  collectionsSorting: SortTypes;
}

const initialState: SortState = {
  usersSorting: 'fromNewToOld',
  collectionsSorting: 'fromNewToOld',
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

    setDefaultUsersSorting(state) {
      state.usersSorting = 'fromNewToOld';
    },
  },
});

export const { setUsersSortingType, setCollectionsSortingType, setDefaultUsersSorting } =
  sortSlice.actions;

export default sortSlice.reducer;
