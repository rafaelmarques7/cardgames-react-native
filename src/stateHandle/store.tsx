import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { startGame } from './actions';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  // stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

// dispatch action to start game
startGame(store)

const persistor = persistStore(store);

export {
  store,
  persistor,
};