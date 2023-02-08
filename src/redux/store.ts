import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authModalReducer from './slices/modalAuthSlice';

const rootReducer = combineReducers({
  authModal: authModalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
