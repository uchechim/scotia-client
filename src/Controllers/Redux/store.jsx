import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  //FLUSH,
  //REHYDRATE,
  //PAUSE,
  //PERSIST,
  //PURGE,
  //REGISTER,
} from 'redux-persist';
import authReducer from './authSlice';
import listingsReducer from './listingsSlice';
import favoritesListingsReducer from './favoritesListingsSlice';

//combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  propertyListings: listingsReducer,
  favoritesListings: favoritesListingsReducer,
});

//persistconfig
const persistConfig = {
  key: 'root',
  storage,
};

//persisted reducer & store configurations
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export const persistor = persistStore(store);
