import React from 'react';
import { cardToId } from '../logic/misc';
import { ImageList } from '../logic/images';
import { Image, StyleSheet } from 'react-native';

const Card = ({ cardObject=null, backOfDeck=false }) => {
  // Cards are selected according to their filename
  let cardId = backOfDeck ? '1B' : cardToId(cardObject);
  let source = ImageList[cardId];
  return (
    <Image
      source={source}
      style={styles.imageCard}
    />
  );
}

const styles = StyleSheet.create({
  imageCard: {
    width: 440/4,
    height: 600/4,
  },
});

export default Card;
