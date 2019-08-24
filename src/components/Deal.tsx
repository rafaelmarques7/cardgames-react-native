import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const DealButton = ({ callbackFunction, disabled }) => {
  return (
      <TouchableOpacity
        onPress={() => {callbackFunction()}}
        disabled={disabled}>
        <Image
          style={styles.imageCard}
          source={require('../../assets/deck_full_ordered.png')} />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageCard: {
    width: 440/5,
    height: 600/5,
    transform: [{ rotate: '-90deg'}]
  },
});

export default DealButton;
