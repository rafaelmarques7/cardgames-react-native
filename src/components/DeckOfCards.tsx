import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { ImageList } from '../logic/images';
import * as Animatable from 'react-native-animatable';

const selectDeckImg = (fullDeck, deckScrambled) => {
  let key = '';
  if (fullDeck) {
    key = deckScrambled ? 'deck_full_scrambled' : 'deck_full_ordered';
  } else {
    key = deckScrambled ? 'deck_half_scrambled' : 'deck_half_ordered';
  }
  return key;
}

const DeckOfCardsImg = ({ 
  callbackFunction, 
  disabled=true, 
  fullDeck=true, 
  deckScrambled=false,
  shakeAnimation=false,
 }) => {
  const source = ImageList[selectDeckImg(fullDeck, deckScrambled)];
  return (
    <Animatable.View
      animation={shakeAnimation ? 'rubberBand' : null}
      duration={1500}
      iterationCount={"infinite"}
      iterationDelay={2500}>
      <TouchableOpacity
        onPress={() => {callbackFunction()}}
        disabled={disabled}>
        <Image
          style={styles.imageCard}
          source={source} />
      </TouchableOpacity>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  imageCard: {
    width: 440/6,
    height: 600/6,
    transform: [{ rotate: '-90deg'}]
  },
});

export default DeckOfCardsImg;
