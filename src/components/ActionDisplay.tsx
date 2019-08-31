import React from 'react'
import { View, StyleSheet } from 'react-native'
import BetDisplay from '../components/Bet';
import DeckOfCardsImg from './DeckOfCards';

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
        {
          props.cardsInDeck < 52 &&
          <DeckOfCardsImg
            callbackFunction={()=>{}}
            disabled={true} 
            deckScrambled={true}
            fullDeck={false} />
          }
        {/* This serves as the dealer button 
            @TODO make deck stand out, so player knows it's an action button */}
        <DeckOfCardsImg
          callbackFunction={props.actionGameDeal}
          disabled={!props.gameStatus.dealMode} 
          deckScrambled={false}
          fullDeck={props.cardsInDeck > 26 ? true : false} />
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