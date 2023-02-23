import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Token, User } from 'ts/interfaces';

interface UserState {
  user: User | null;
  token: Token | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
      state.isAdmin = payload?.roles.includes('admin') || false;
    },

    setToken(state, { payload }: PayloadAction<Token | null>) {
      state.token = payload;
    },

    setLoggedIn(state, { payload }: PayloadAction<boolean>) {
      state.isLoggedIn = payload;
    },

    setLoggedOut(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setToken, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
