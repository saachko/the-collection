import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from 'ts/interfaces';

interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },

    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
    },

    setLoggedIn(state, { payload }: PayloadAction<boolean>) {
      state.isLoggedIn = payload;
    },

    setLoggedOut(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setToken, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
