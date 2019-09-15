import React from 'react'
import { View, StyleSheet } from 'react-native'
import { screen } from '../config';
import ActionDisplay from '../components/ActionDisplay';
import HandOfPlayer from '../components/HandPlayer';
import StatusBarContainer from '../containers/StatusBarContainer';
import LooseModalContainer from '../containers/LooseModalContainer';
import BetDisplay from '../components/Bet';

const GameView = (props) => {
  // console.log('GameView props: ', props.gameStatus)
  return(
    <View style={styles.container}>
      <StatusBarContainer />
      <LooseModalContainer />
      <HandOfPlayer
        player={props.dealer}
        positionOnTop={true}
        displayCards={props.gameStatus.betMode || props.gameStatus.showMode}
        renderStrength={props.gameStatus.betMode || props.gameStatus.showMode}
        actionSetUserUsername={props.actionSetUserUsername}/>
      <ActionDisplay 
        {...props} />
      <HandOfPlayer
        player={props.player}
        positionOnTop={false}
        displayCards={props.gameStatus.showMode}
        renderStrength={props.gameStatus.showMode}
        actionSetUserUsername={props.actionSetUserUsername}/>
      <BetDisplay
        betValue={props.player.creditAmmount}
        onSetBet={(bet) => {props.actionGameBet([bet])}}
        acceptBets={props.gameStatus.betMode} 
        betOn={props.player.betOn} />
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
