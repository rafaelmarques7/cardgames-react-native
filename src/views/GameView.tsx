import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlayerCards from '../components/PlayerCards';
import ActionDisplay from '../components/ActionDisplay';
import { screen } from '../config';
import ConfigContainer from '../containers/ConfigContainer';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <ConfigContainer />
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand}
        gameStatus={props.gameStatus} 
        showCards={props.gameStatus.showMode || props.gameStatus.endMode ? true : false}
        valueHand={props.dealer.valueHand} />
      <ActionDisplay 
        {...props} />
      <PlayerCards 
        cards={props.player.cards} 
        username={props.player.username} 
        displayCards={props.gameStatus.betMode || props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} 
        credit={props.player.creditAmmount}
        gameStatus={props.gameStatus} 
        showCards={!props.gameStatus.dealMode ? true : false} 
        valueHand={props.valueHand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: 'green',
  }
})

export default GameView;
