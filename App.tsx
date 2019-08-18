import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Game from './src/components/Game';
import GameScreen from './src/components/GameScreen';

export default function App() {
  return (
    // <View style={styles.container}>
    <View>
    {/* <Text>hey Waddduupp!</Text> */}
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <GameScreen />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#009900",
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
