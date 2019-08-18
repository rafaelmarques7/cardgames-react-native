import React from 'react';
import Image from 'react-native-remote-svg';
import { cardToId } from '../logic/misc';
import { ImageList } from '../logic/images';
import { StyleSheet } from 'react-native';

const Card = ({ cardObject=null, backOfDeck=false }) => {
  // Cards are selected according to svg filename
  console.log(`inside Card`);
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
    height: 120,
    width: 80,
    margin: 5,
  },
});

export default Card;
