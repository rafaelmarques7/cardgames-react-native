import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { screen } from '../config';

const PlayersCards = ({ cards, numCardsPerHand, displayCards=true, username=''}) => {
  const position = username === 'Dealer' ? 'top' :'bottom';
  if (cards && cards.length < 1) {
    cards = new Array(numCardsPerHand, true)
  }

  const styles = createStyle(position==='bottom');

  return (
    <View style={styles.container} >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>	
      </View>
      <View style={styles.handContainer}>
        { cards.map((card, index) => {
            return (
              <View
                key={`card-${index}`}
                style={styles.cardContainer}>
                <Card 
                  cardObject={card} 
                  backOfDeck={!displayCards} />
              </View>
            );
          })
        }
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
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: bottom ? 'flex-end' : 'flex-start', // if bottom, move cards to bottom of their containers flex
    },
    cardContainer: {
      margin: 8,
    },
    textContainer: {
      alignSelf: 'center',
      borderTopColor: 'white',
      borderBottomColor: 'white',
      borderBottomWidth: bottom ? 2*StyleSheet.hairlineWidth : null,
      borderTopWidth: !bottom ? 2*StyleSheet.hairlineWidth : null,
      width: screen.width * 0.8,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
}

export default PlayersCards;
