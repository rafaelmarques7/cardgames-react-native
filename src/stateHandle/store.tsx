import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { startGame } from './game';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'highscores'],
  blacklist: ['game', 'statusGame'],
  stateReconciler: autoMergeLevel2,
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