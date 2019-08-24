import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CreditPlayer = ({ ammount }) => (
  <View style={styles.container}>
    <Image 
      style={styles.image}
      source={require('../../assets/gold-coins.png')} />
    <Text 
      style={styles.text}>
      {ammount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 7,
  },
  image: {
    height: 20,
    width: 20,
    marginBottom: 7,
  }
});


export default CreditPlayer;
