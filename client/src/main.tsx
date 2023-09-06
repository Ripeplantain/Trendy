import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers } from 'redux';

import usersReducer from './state/features/userSlice';
import postsReducer from './state/features/postSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
})

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store); // Create a persistor

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

