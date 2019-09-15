import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DeckOfCardsImg from './DeckOfCards';
import AnimationContainer from './AnimationContainer';

const ActionDisplay = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerDeal}>
        { props.cardsInDeck < 52 &&
          <DeckOfCardsImg
            callbackFunction={()=>{}}
            disabled={true} 
            deckScrambled={true}
            fullDeck={false} />
        }
        <DeckOfCardsImg
          callbackFunction={props.actionGameDeal}
          disabled={!props.gameStatus.dealMode} 
          deckScrambled={false}
          fullDeck={props.cardsInDeck > 26 ? true : false} 
          shakeAnimation={props.gameStatus.dealMode} />
      </View>
      <View style={styles.containerResult}>
      { props.gameStatus.showMode &&
        <AnimationContainer
          animate={true} animationType='bounceIn' iterationDelay={500}>
          <Text style={styles.text}>
            {props.player.isWinner ? 'Nice!' : 'Nope!'}
          </Text>
        </AnimationContainer>
      }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2/3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerDeal: {
    marginLeft: 25,
  },
  containerResult: {
    position: 'absolute',
    left:0, 
    right: 0,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  }
});

export default ActionDisplay;
