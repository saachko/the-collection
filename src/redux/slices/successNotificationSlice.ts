import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SuccessNotificationState {
  isCollectionCreated: boolean;
  isItemCreated: boolean;
}

const initialState: SuccessNotificationState = {
  isCollectionCreated: false,
  isItemCreated: false,
};

const successNotificationSlice = createSlice({
  name: 'successNotification',
  initialState,
  reducers: {
    setCollectionCreated(state, { payload }: PayloadAction<boolean>) {
      state.isCollectionCreated = payload;
    },

    setItemCreated(state, { payload }: PayloadAction<boolean>) {
      state.isItemCreated = payload;
    },
  },
});

export const { setCollectionCreated, setItemCreated } = successNotificationSlice.actions;

export default successNotificationSlice.reducer;
