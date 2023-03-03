import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthModal } from 'ts/types';

interface AuthModalState {
  id: AuthModal;
  isShown: boolean;
}

const initialState: AuthModalState = {
  id: '',
  isShown: false,
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    showModal(state, { payload }: PayloadAction<AuthModal>) {
      state.isShown = true;
      state.id = payload;
    },
    closeModal(state) {
      state.isShown = false;
    },
  },
});

export const { showModal, closeModal } = authModalSlice.actions;

export default authModalSlice.reducer;
