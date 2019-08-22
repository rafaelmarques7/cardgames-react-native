import React from 'react';
import Image from 'react-native-remote-svg';
import { cardToId } from '../logic/misc';
import { ImageList } from '../logic/images';
import { StyleSheet } from 'react-native';

const Card = ({ cardObject=null, backOfDeck=false }) => {
  // Cards are selected according to svg filename
  console.log(`inside Card`);
  let key = backOfDeck ? '1B' : cardToId(cardObject);
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
    width: 440/4,
    height: 600/4,
    // marginLeft: 10, 
    // marginRight: 10,
  },
});

export default Card;
