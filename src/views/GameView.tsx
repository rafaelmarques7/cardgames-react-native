import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlayerCards from '../components/PlayerCards';
import ActionDisplay from '../components/ActionDisplay';
import { screen } from '../config';
import CreditPlayer from '../components/Credit';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <CreditPlayer 
          ammount={props.player.creditAmmount} />
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} />
      <ActionDisplay 
        {...props} />
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
    // alignItems: "center",
    paddingTop: (screen.heightScreen - screen.heightWindow)/2,
    backgroundColor: 'green',
  },
})


export default GameView;
