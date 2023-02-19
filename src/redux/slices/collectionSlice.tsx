import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Collection } from 'ts/interfaces';

interface CollectionState {
  collections: Collection[] | null;
}

const initialState: CollectionState = {
  collections: null,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections(state, { payload }: PayloadAction<Collection[] | null>) {
      state.collections = payload;
    },
  },
});

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
