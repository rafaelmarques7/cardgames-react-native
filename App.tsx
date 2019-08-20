import React from 'react';
import GameScreen from './src/components/GameScreen';
import Game from './src/containers/Game';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './src/stateHandle/reducer';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      {/* <Game /> */}
    <GameScreen />
    </Provider>
  );
}
