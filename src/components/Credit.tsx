import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CreditPlayer = (props) => (
  <View style={styles.container}>
    <Text 
      style={styles.text}>
      {props.credit}
    </Text>
    <Image 
      style={styles.image}
      source={require('../../assets/gold-coins.png')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: 60,
    right: 10,
    width: 60,
  },
  text: {
    fontWeight: 'bold',
  },
  image: {
    // flex: 1,
    height: 20,
    width: 20,
    marginLeft: 5,
  }
});


export default CreditPlayer;
