import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Comment, Item } from 'ts/interfaces';

interface SearchState {
  searchValue: string;
  offcanvasShown: boolean;
  allComments: Comment[] | null;
  allItems: Item[] | null;
}

const initialState: SearchState = {
  searchValue: '',
  offcanvasShown: false,
  allComments: null,
  allItems: null,
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
  },
});

export const { setSearchValue, setOffcanvasShown, setAllComments, setAllItems } =
  searchSlice.actions;

export default searchSlice.reducer;
