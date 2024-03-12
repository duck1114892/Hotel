import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/asscess';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import upadloadReducer from './upload/asscess';
import uploadReducer from './upload/asscess';
import isUpdateReducer from './confim/confrimUpdate';
import searchReducer from './search/asscess';
import filterReducer from './filter/asscess';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['loginReducer']
}

const rootReducers = combineReducers({
  loginReducer: loginReducer,
  uploadReducer: uploadReducer,
  isUpdateReducer: isUpdateReducer,
  searchReducer: searchReducer,
  filterReducer: filterReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export { store, persistor }

