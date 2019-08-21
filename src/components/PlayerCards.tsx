import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const PlayersCards = ({ cards, numCardsPerHand, displayCards=true, username=''}) => {
  if (cards && cards.length < 1) {
    cards = new Array(numCardsPerHand, true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
      { cards.map((card, index) => {
          return (
            <Card 
              key={`card-${index}`}
              cardObject={card} 
              backOfDeck={!displayCards}
            />
          );
        })
      }
      </View>
      <Text style={styles.text}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    marginLeft: 100,
  },
  text: {
    textAlign: 'center',
  },
  container: {
    top: 150,
    margin: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  }
});

export default PlayersCards;
