import React from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import HomeContainer from './src/containers/HomeContainer';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/stateHandle/store'

Amplify.configure(aws_exports);

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <HomeContainer />
      {/* </PersistGate> */}
    </Provider>
  );
}
