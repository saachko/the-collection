import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CustomField, Item } from 'ts/interfaces';

interface ItemState {
  itemsInCollection: Item[] | null;
  customFieldsToItems: CustomField[] | null;
  selectedItem: Item | null;
}

const initialState: ItemState = {
  itemsInCollection: null,
  customFieldsToItems: null,
  selectedItem: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, { payload }: PayloadAction<Item[] | null>) {
      state.itemsInCollection = payload;
    },

    setCustomFieldsToItems(state, { payload }: PayloadAction<CustomField[] | null>) {
      state.customFieldsToItems = payload;
    },

    setSelectedItem(state, { payload }: PayloadAction<Item | null>) {
      state.selectedItem = payload;
    },
  },
});

export const { setItems, setCustomFieldsToItems, setSelectedItem } = itemSlice.actions;

export default itemSlice.reducer;
