import React from 'react'
import { View, StyleSheet } from 'react-native'
import { screen } from '../config';
import ActionDisplay from '../components/ActionDisplay';
import HandOfPlayer from '../components/HandPlayer';
import StatusBarContainer from '../containers/StatusBarContainer';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <StatusBarContainer />
      <HandOfPlayer
        player={props.dealer}
        positionOnTop={true}
        displayCards={props.gameStatus.showMode || props.gameStatus.endMode}
        renderStrength={props.gameStatus.showMode || props.gameStatus.endMode}
      />
      <ActionDisplay 
        {...props} />
      <HandOfPlayer
        player={props.player}
        positionOnTop={false}
        renderCredit={true}
        displayCards={!props.gameStatus.dealMode}
        renderStrength={!props.gameStatus.dealMode} />
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
