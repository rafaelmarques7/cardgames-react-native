import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './src/stateHandle';
import { startGame } from './src/stateHandle';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import HomeContainer from './src/containers/HomeContainer';

Amplify.configure(aws_exports);

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
startGame(store); // dispatch initial action to start the game state

export default function App() {
  return (
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  );
}
