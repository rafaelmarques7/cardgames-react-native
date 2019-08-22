import React from 'react';
import Game from './src/containers/GameContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './src/stateHandle';
import { startGame } from './src/stateHandle';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
startGame(store); // dispatch initial action to start the game state

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
