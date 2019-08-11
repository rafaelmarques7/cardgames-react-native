import React from 'react';
import Image from 'react-native-remote-svg';
import { cardToId, cardToSvgPath } from '../logic/misc';
import { ImageList } from '../logic/images';
import { StyleSheet } from 'react-native';


export const Card = ({ cardObject=null, backOfDeck=false }) => {
  console.log(backOfDeck, cardObject)
  let key = backOfDeck !== false ? '1B' : cardToId(cardObject);
  let source = ImageList[key];
  return (
    <Image
      source={source}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
