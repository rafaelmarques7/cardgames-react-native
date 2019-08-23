import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const PlayersCards = ({ cards, numCardsPerHand, displayCards=true, username=''}) => {
  const position = username === 'Dealer' ? 'top' :'bottom';
  if (cards && cards.length < 1) {
    cards = new Array(numCardsPerHand, true)
  }

  return (
    <View style={styles.container} >
      <View style={[styles.cards, styles[position]]}>
        { cards.map((card, index) => {
            return (
              <View
                key={`card-${index}`}
                style={styles.cardContainer}>
                <Card 
                  cardObject={card} 
                  backOfDeck={!displayCards}
                />
              </View>
            );
          })
        }
        <Text style={styles.text}>{username}</Text>	
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: 'green'
  },
  top: {
    marginTop: 20,
  },
  bottom: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 8,
  },
  text: {
    textAlign: 'center',
  },
});

export default PlayersCards;
