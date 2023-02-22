import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SuccessNotificationState {
  isCollectionCreated: boolean;
}

const initialState: SuccessNotificationState = {
  isCollectionCreated: false,
};

const successNotificationSlice = createSlice({
  name: 'successNotification',
  initialState,
  reducers: {
    setCollectionCreated(state, { payload }: PayloadAction<boolean>) {
      state.isCollectionCreated = payload;
    },
  },
});

export const { setCollectionCreated } = successNotificationSlice.actions;

export default successNotificationSlice.reducer;
