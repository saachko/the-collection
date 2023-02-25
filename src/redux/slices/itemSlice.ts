import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Item } from 'ts/interfaces';

interface ItemState {
  itemsInCollection: Item[] | null;
  selectedItem: Item | null;
}

const initialState: ItemState = {
  itemsInCollection: null,
  selectedItem: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, { payload }: PayloadAction<Item[] | null>) {
      state.itemsInCollection = payload;
    },

    setSelectedItem(state, { payload }: PayloadAction<Item | null>) {
      state.selectedItem = payload;
    },
  },
});

export const { setItems, setSelectedItem } = itemSlice.actions;

export default itemSlice.reducer;
