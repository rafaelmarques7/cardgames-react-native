/**
 * This component sits on the top of the GameView.
 * It displays the players lifes,
 * and the players current score.
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Heart from './Heart';
import ConfigContainer from '../containers/ConfigContainer';
import CreditPlayer from './Credit';
import { brown } from '../styles';

/**
 * numLives - renders $numLives red hearts
 * numDeaths - render $numDeaths no color hearts
 * numPoints - renders highscore with $numPoints
 */
const StatusBar = ({ numLives=0, numDeaths=3, numPoints=2 }) => {
  return(
    <View style={styles.container}>
      <View style={styles.config}>
        <ConfigContainer />
      </View>
      <View style={styles.lifes}>
        {[...Array(numLives + numDeaths)].map((e, i) => (
          <Heart isLive={i<numLives} key={`heart-${i}`}/>
        ))}
      </View>
      <View style={styles.highscore}>
        <CreditPlayer ammount={numPoints} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: brown,
  },
  config: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lifes: {
    flex: 4,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  highscore: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  numPoints: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5,
    marginBottom: 3,
  }
})

export default StatusBar
