import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

const PlayerGround = (props) => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerBoxA}>
        <Text>Box A</Text>
      </View>
      <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />

      {/* <View style={styles.containerBoxB}>
        <Text>Box B</Text>
      </View>
      <View style={styles.containerBoxC}>
        <Text>Box C</Text>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: 'red',
    height: 100,
  },
  containerBoxA: {
    textAlign: 'center',
  },
  containerBoxB: {

  },
  containerBoxC: {

  },
});

// const styles = StyleSheet.create({
//   containerMain: {
//     flex: 1,
//     backgroundColor: 'red',
//     height: '',
//   },
//   containerBoxA: {

//   },
//   containerBoxB: {

//   },
//   containerBoxC: {

//   },
// });

export default PlayerGround;
