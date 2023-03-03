import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Collection, Comment, Item } from 'ts/interfaces';

interface SearchState {
  searchValue: string;
  offcanvasShown: boolean;
  allComments: Comment[] | null;
  allItems: Item[] | null;
  foundInItems: Item[];
  foundInCollections: Item[];
  foundInComments: Item[];
  meilisearchItems: Array<{ id: string; element: Item }>;
  meilisearchCollections: Array<{ id: string; element: Collection }>;
  meilisearchComments: Array<{ id: string; element: Comment }>;
}

const initialState: SearchState = {
  searchValue: '',
  offcanvasShown: false,
  allComments: null,
  allItems: null,
  foundInItems: [],
  foundInCollections: [],
  foundInComments: [],
  meilisearchItems: [],
  meilisearchCollections: [],
  meilisearchComments: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },

    setOffcanvasShown(state, { payload }: PayloadAction<boolean>) {
      state.offcanvasShown = payload;
    },

    setAllComments(state, { payload }: PayloadAction<Comment[] | null>) {
      state.allComments = payload;
    },

    setAllItems(state, { payload }: PayloadAction<Item[] | null>) {
      state.allItems = payload;
    },

    setFoundInItems(state, { payload }: PayloadAction<Item[]>) {
      state.foundInItems = payload;
    },

    setFoundInCollections(state, { payload }: PayloadAction<Item[]>) {
      state.foundInCollections = payload;
    },

    setFoundInComments(state, { payload }: PayloadAction<Item[]>) {
      state.foundInComments = payload;
    },

    resetSearchResults(state) {
      state.searchValue = '';
      state.foundInItems = [];
      state.foundInCollections = [];
      state.foundInComments = [];
    },

    setMeilisearchItems(
      state,
      { payload }: PayloadAction<Array<{ id: string; element: Item }>>
    ) {
      state.meilisearchItems = payload;
    },

    setMeilisearchCollections(
      state,
      { payload }: PayloadAction<Array<{ id: string; element: Collection }>>
    ) {
      state.meilisearchCollections = payload;
    },

    setMeilisearchComments(
      state,
      { payload }: PayloadAction<Array<{ id: string; element: Comment }>>
    ) {
      state.meilisearchComments = payload;
    },
  },
});

export const {
  setSearchValue,
  setOffcanvasShown,
  setAllComments,
  setAllItems,
  setFoundInItems,
  setFoundInCollections,
  setFoundInComments,
  resetSearchResults,
  setMeilisearchItems,
  setMeilisearchCollections,
  setMeilisearchComments,
} = searchSlice.actions;

export default searchSlice.reducer;
