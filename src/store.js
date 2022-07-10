import { createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import moviesApp from './reducers/reducers';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['movies', 'user']
}

const persistedReducer = persistReducer(persistConfig, moviesApp) // create a persisted reducer

const store = createStore(
    persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
    applyMiddleware() // add any middlewares here
);

const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}