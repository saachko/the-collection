import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import apiSlice from './api/apiSlice';
import adminReducer from './slices/adminSlice';
import collectionReducer from './slices/collectionSlice';
import authModalReducer from './slices/modalAuthSlice';
import sortReducer from './slices/sortSlice';
import successNotificationReducer from './slices/successNotificationSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: [],
};

const userConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'isAdmin'],
};

const rootReducer = combineReducers({
  authModal: authModalReducer,
  sort: sortReducer,
  user: persistReducer(userConfig, userReducer),
  admin: adminReducer,
  collection: collectionReducer,
  successNotification: successNotificationReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { persistor };
export default store;
