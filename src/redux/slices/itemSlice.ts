import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CustomField, Item } from 'ts/interfaces';

interface ItemState {
  itemsInCollection: Item[] | null;
  customFieldsInItem: CustomField[] | null;
  customFieldsValues: string[];
  selectedItem: Item | null;
  lastAddedItems: Item[] | null;
}

const initialState: ItemState = {
  itemsInCollection: null,
  customFieldsInItem: null,
  customFieldsValues: [],
  selectedItem: null,
  lastAddedItems: null,
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
  },
});

export const {
  setItems,
  setCustomFieldsInItem,
  setCustomFieldsValues,
  setSelectedItem,
  setLastAddedItems,
} = itemSlice.actions;

export default itemSlice.reducer;
