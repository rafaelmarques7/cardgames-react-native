import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { ImageList } from '../logic/images';

const selectDeckImg = (fullDeck, deckScrambled) => {
  let key = '';
  if (fullDeck) {
    key = deckScrambled ? 'deck_full_scrambled' : 'deck_full_ordered';
  } else {
    key = deckScrambled ? 'deck_half_scrambled' : 'deck_half_ordered';
  }
  return key;
}

const DeckOfCardsImg = ({ callbackFunction,  disabled=true, fullDeck=true, deckScrambled=false }) => {
  const source = ImageList[selectDeckImg(fullDeck, deckScrambled)];
  return (
    <TouchableOpacity
      onPress={() => {callbackFunction()}}
      disabled={disabled}>
      <Image
        style={styles.imageCard}
        source={source} />
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

export default DeckOfCardsImg;
