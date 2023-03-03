import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SelectOption, Tag } from 'ts/interfaces';

interface TagState {
  allTags: Tag[] | null;
  tagsToItem: Tag[] | null;
  tagsFromInput: SelectOption[];
  popularTags: Tag[] | null;
}

const initialState: TagState = {
  allTags: null,
  tagsToItem: null,
  tagsFromInput: [],
  popularTags: null,
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

    setPopularTags(state, { payload }: PayloadAction<Tag[] | null>) {
      state.popularTags = payload;
    },
  },
});

export const { setAllTags, setTagsToItem, setTagsFromInput, setPopularTags } =
  tagSlice.actions;

export default tagSlice.reducer;
