import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SelectOption, Tag } from 'ts/interfaces';

interface TagState {
  allTags: Tag[] | null;
  tagsToItem: Tag[] | null;
  tagsFromInput: SelectOption[];
}

const initialState: TagState = {
  allTags: null,
  tagsToItem: null,
  tagsFromInput: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setAllTags(state, { payload }: PayloadAction<Tag[] | null>) {
      state.allTags = payload;
    },

    setTagsToItem(state, { payload }: PayloadAction<Tag[] | null>) {
      state.tagsToItem = payload;
    },

    setTagsFromInput(state, { payload }: PayloadAction<SelectOption[]>) {
      state.tagsFromInput = payload;
    },
  },
});

export const { setAllTags, setTagsToItem, setTagsFromInput } = tagSlice.actions;

export default tagSlice.reducer;
