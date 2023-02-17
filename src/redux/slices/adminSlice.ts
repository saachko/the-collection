import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from 'ts/interfaces';

interface AdminState {
  users: User[] | null;
  selectedUser: User | null;
}

const initialState: AdminState = {
  users: null,
  selectedUser: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<User[] | null>) {
      state.users = payload;
    },

    setSelectedUser(state, { payload }: PayloadAction<User | null>) {
      state.selectedUser = payload;
    },
  },
});

export const { setUsers, setSelectedUser } = adminSlice.actions;

export default adminSlice.reducer;
