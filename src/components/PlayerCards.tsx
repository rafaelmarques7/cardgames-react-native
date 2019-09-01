import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screen } from '../config';
import CreditPlayer from './Credit';
import CardWithFlip from './CardWithFlip';

const PlayersCards = ({ 
  cards, 
  numCardsPerHand, 
  displayCards=true, 
  username='',
  credit=null,
  flipCards=false,
  }) => {
  
  const position = username === 'Dealer' ? 'top' :'bottom';
  if (cards && cards.length < 1) {
    cards = new Array(numCardsPerHand).fill(0)
  }
  const renderCredit = username !== 'Dealer' ? true : false;

  const styles = createStyle(position==='bottom');

  return (
    <View style={styles.container} >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>	
        { renderCredit && <CreditPlayer ammount={credit}/> }
      </View>
      <View style={styles.handContainer}>
        { cards.map((card, index) => (
            <View
              key={`card-${index}`}
              style={styles.cardContainer}>
              <CardWithFlip
                cardObject={card} 
                backOfDeck={!displayCards} 
                flipCards={flipCards}/>
            </View>
          ))
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      borderTopColor: 'white',
      borderBottomColor: 'white',
      borderBottomWidth: bottom ? 2 * StyleSheet.hairlineWidth : null,
      borderTopWidth: !bottom ? 2 * StyleSheet.hairlineWidth : null,
      width: screen.width * 0.8,
      height: 30,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
}

export default PlayersCards;
