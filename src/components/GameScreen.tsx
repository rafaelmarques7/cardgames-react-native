import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CreditPlayer from './Credit';
import PlayerCards from './PlayerCards';
import BetDisplay from './Bet';
import { screen } from '../config';

const GameScreen = (props) => {
  props = {...props, screen};
  console.log('<GameScreen /> props: ', props);
  return(
    <View>
      <CreditPlayer creditAmmount={2} {...props} />
      {/* <PlayerCards dealer={true} {...props} />
      <BetDisplay {...props} />
      <PlayerCards {...props} /> */}
    </View>
  );  
}

export default GameScreen;
