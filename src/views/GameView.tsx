import React from 'react'
import { View, StyleSheet } from 'react-native'
import { screen } from '../config';
import ActionDisplay from '../components/ActionDisplay';
import HandOfPlayer from '../components/HandPlayer';
import StatusBarContainer from '../containers/StatusBarContainer';
import LooseModalContainer from '../containers/LooseModalContainer';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <StatusBarContainer />
      <LooseModalContainer />
      <HandOfPlayer
        player={props.dealer}
        positionOnTop={true}
        displayCards={props.gameStatus.showMode || props.gameStatus.endMode}
        renderStrength={props.gameStatus.showMode || props.gameStatus.endMode}
        actionSetUserUsername={props.actionSetUserUsername}/>
      <ActionDisplay 
        {...props} />
      <HandOfPlayer
        player={props.player}
        positionOnTop={false}
        displayCards={!props.gameStatus.dealMode}
        renderStrength={!props.gameStatus.dealMode}
        actionSetUserUsername={props.actionSetUserUsername}/>
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
