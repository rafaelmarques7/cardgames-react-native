import React from 'react';
import Game from './src/containers/Game';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './src/stateHandle';
import { startGame } from './src/stateHandle';

const store = createStore(rootReducer);
startGame(store); // dispatch initial action to start the game state

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
