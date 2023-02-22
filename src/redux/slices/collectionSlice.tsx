import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Collection } from 'ts/interfaces';

interface CollectionState {
  collections: Collection[] | null;
  selectedCollection: Collection | null;
  collectionsByUser: Collection[] | null;
  collectionsBySelectedUser: Collection[] | null;
}

const initialState: CollectionState = {
  collections: null,
  selectedCollection: null,
  collectionsByUser: null,
  collectionsBySelectedUser: null,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections(state, { payload }: PayloadAction<Collection[] | null>) {
      state.collections = payload;
    },

    setSelectedCollection(state, { payload }: PayloadAction<Collection | null>) {
      state.selectedCollection = payload;
    },

    setCollectionsByUser(state, { payload }: PayloadAction<Collection[] | null>) {
      state.collectionsByUser = payload;
    },

    setCollectionsBySelectedUser(state, { payload }: PayloadAction<Collection[] | null>) {
      state.collectionsBySelectedUser = payload;
    },

    resetCollectionsByUsers(state) {
      state.collectionsByUser = null;
      state.collectionsBySelectedUser = null;
    },
  },
});

export const {
  setCollections,
  setSelectedCollection,
  setCollectionsByUser,
  setCollectionsBySelectedUser,
  resetCollectionsByUsers,
} = collectionSlice.actions;

export default collectionSlice.reducer;
