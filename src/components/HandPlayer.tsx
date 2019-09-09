import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screen } from '../config';
import CardWithFlip from './CardWithFlip';
import StrengthOfHand from './StrengthOfHand';

const HandOfPlayer = ({
  player,
  positionOnTop=false,
  renderStrength=false,
  displayCards=false,
}) => {
  // deconstruct props
  const { username, cards, valueHand } = player;
  // create stylesheet based on position
  const styles = createStyle(!positionOnTop);

  return (
    <View style={styles.container} >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>	
      </View>
      <View style={styles.handContainer}>     
        {cards.map((card, index) => (
          <View
            key={`card-${index}`}
            style={styles.cardContainer}>
            <CardWithFlip
              cardObject={card} 
              backOfDeck={!displayCards} 
              showCards={displayCards}/>
          </View>
        ))}
      </View>
      <View style={styles.strengthContainer}>
        { renderStrength && 
          <StrengthOfHand 
            valueHand={valueHand} 
            numCardsPerHand={cards.length} /> }
      </View>
    </View>
  );
}

const createStyle = (bottom=false) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: bottom ? 'column-reverse' : 'column', // if bottom, reverse the direction of childs views
      margin: 5,
      paddingBottom: bottom ? 20 : 0,
      paddingTop: !bottom ? 20: 0,
    },
    handContainer: {
      flex: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: bottom ? 'flex-end' : 'flex-start', // if bottom, move cards to bottom of their containers flex
    },
    cardContainer: {
      margin: 8,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      borderTopColor: 'white',
      borderBottomColor: 'white',
      borderBottomWidth: bottom ? 2 * StyleSheet.hairlineWidth : null,
      borderTopWidth: !bottom ? 2 * StyleSheet.hairlineWidth : null,
      width: screen.width * 0.7,
      height: 30,
    },
    text: {
      fontSize: 17,
      color: 'white',
      textAlign: 'center',
      fontWeight: '600',
      fontFamily: 'Roboto',
    },
    strengthContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
}

export default HandOfPlayer;
