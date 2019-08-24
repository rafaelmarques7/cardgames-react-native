import React from 'react'
import { View, StyleSheet } from 'react-native'
import CreditPlayer from '../components/Credit';
import BetDisplay from '../components/Bet';
import DealButton from '../components/Deal'; 


const ActionDisplay = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBet}>
        <BetDisplay 
          betMaximum={props.player.creditAmmount}
          onSetBet={(bet) => {props.actionGameBet([bet])}}
          acceptBets={props.gameStatus.betMode} />
      </View>
      <View style={styles.containerDeal}>
        <DealButton 
          callbackFunction={props.actionGameDeal}
          disabled={!props.gameStatus.dealMode} /> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerBet: {
    marginLeft: 25,
  },
  containerDeal: {
    marginRight: 25,
  },
});

export default ActionDisplay;
