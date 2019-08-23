import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const DealButton = ({ callbackFunction, disabled }) => {
  return (
    // <View style={styles.container}>
      <Button 
        title="Deal" 
        onPress={() => {callbackFunction()}}
        disabled={disabled}
        />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 100,
    margin: 10,
  }
});

export default DealButton;
