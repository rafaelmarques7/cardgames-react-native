import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screen } from '../config';
import CreditPlayer from './Credit';
import CardWithFlip from './CardWithFlip';
import StrengthOfHand from './StrengthOfHand';

const HandOfPlayer = ({
  player,
  positionOnTop=false,
  renderCredit=false,
  renderStrength=false,
  displayCards=false,
}) => {
  // deconstruct props
  const { username, cards, creditAmmount, valueHand } = player;
  // create stylesheet based on position
  const styles = createStyle(!positionOnTop);

  return (
    <View style={styles.container} >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>	
        { renderCredit && <CreditPlayer ammount={creditAmmount}/> }
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
      // backgroundColor: 'white',
    },
    handContainer: {
      flex: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: bottom ? 'flex-end' : 'flex-start', // if bottom, move cards to bottom of their containers flex
      // backgroundColor: 'red',
    },
    cardContainer: {
      margin: 8,
    },
    textContainer: {
      // backgroundColor: 'blue',
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
      textAlign: 'center',
      fontWeight: 'bold',
    },
    strengthContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'black',
    }
  });
}

export default HandOfPlayer;
