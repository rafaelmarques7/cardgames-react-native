import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlayerCards from '../components/PlayerCards';
import ActionDisplay from '../components/ActionDisplay';
import { screen } from '../config';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand}
        gameStatus={props.gameStatus} 
        flipCards={props.gameStatus.showMode || props.gameStatus.endMode ? true : false} />
      <ActionDisplay 
        {...props} />
      <PlayerCards 
        cards={props.player.cards} 
        username={props.player.username} 
        displayCards={props.gameStatus.betMode || props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} 
        credit={props.player.creditAmmount}
        gameStatus={props.gameStatus} 
        flipCards={props.gameStatus.betMode || props.gameStatus.endMode ? true : false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: 'green',
  },
})

export default GameView;
