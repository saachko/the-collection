import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Comment, CustomField, Item } from 'ts/interfaces';

interface ItemState {
  itemsInCollection: Item[] | null;
  customFieldsInItem: CustomField[] | null;
  customFieldsValues: string[];
  selectedItem: Item | null;
  lastAddedItems: Item[] | null;
  commentsToItem: Comment[] | null;
}

const initialState: ItemState = {
  itemsInCollection: null,
  customFieldsInItem: null,
  customFieldsValues: [],
  selectedItem: null,
  lastAddedItems: null,
  commentsToItem: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, { payload }: PayloadAction<Item[] | null>) {
      state.itemsInCollection = payload;
    },

    setCustomFieldsInItem(state, { payload }: PayloadAction<CustomField[] | null>) {
      state.customFieldsInItem = payload;
    },

    setCustomFieldsValues(state, { payload }: PayloadAction<string[]>) {
      state.customFieldsValues = payload;
    },

    setSelectedItem(state, { payload }: PayloadAction<Item | null>) {
      state.selectedItem = payload;
    },

    setLastAddedItems(state, { payload }: PayloadAction<Item[] | null>) {
      state.lastAddedItems = payload;
    },

    setCommentsToItem(state, { payload }: PayloadAction<Comment[] | null>) {
      state.commentsToItem = payload;
    },
  },
});

export const {
  setItems,
  setCustomFieldsInItem,
  setCustomFieldsValues,
  setSelectedItem,
  setLastAddedItems,
  setCommentsToItem,
} = itemSlice.actions;

export default itemSlice.reducer;
