import React from 'react';
import Game from './src/containers/GameContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './src/stateHandle';
import { startGame } from './src/stateHandle';
import HomeView from './src/views/HomeView';
import Amplify from 'aws-amplify';

// this connects the AWS resources created with Amplify
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
startGame(store); // dispatch initial action to start the game state

export default function App() {
  return (
    <Provider store={store}>
      {/* <Game /> */}
      <HomeView />
    </Provider>
  );
}
