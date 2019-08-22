import React from 'react'
import { View, StyleSheet } from 'react-native'
import CreditPlayer from '../components/Credit';
import PlayerCards from '../components/PlayerCards';
import BetDisplay from '../components/Bet';
import DealButton from '../components/Deal'; 

const GameView = (props) => {
  return(
    <View style={styles.container}>
      {/* <CreditPlayer 
        ammount={props.player.creditAmmount} /> */}
      {/* <DealButton 
        callbackFunction={props.actionGameDeal}
        disabled={!props.gameStatus.dealMode} />  */}
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} />
      {/* <BetDisplay 
        betMaximum={props.player.creditAmmount}
        onSetBet={(bet) => {props.actionGameBet([bet])}}
        acceptBets={props.gameStatus.betMode} /> */}
      <PlayerCards 
        cards={props.player.cards} 
        username={props.player.username} 
        displayCards={props.gameStatus.betMode || props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
})


export default GameView;
