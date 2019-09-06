import React from 'react'
import { View, StyleSheet } from 'react-native'
import { screen } from '../config';
import ConfigContainer from '../containers/ConfigContainer';
import ActionDisplay from '../components/ActionDisplay';
import HandPlayer from '../components/HandPlayer';

const GameView = (props) => {
  return(
    <View style={styles.container}>
      <ConfigContainer />
      <HandPlayer
        player={props.dealer}
        positionOnTop={true}
        displayCards={props.gameStatus.showMode || props.gameStatus.endMode}
        renderStrength={props.gameStatus.showMode || props.gameStatus.endMode}
      />
      <ActionDisplay 
        {...props} />
      <HandPlayer
        player={props.player}
        positionOnTop={false}
        renderCredit={true}
        displayCards={!props.gameStatus.dealMode}
        renderStrength={!props.gameStatus.dealMode}
       />
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
