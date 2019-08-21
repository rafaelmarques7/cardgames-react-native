import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const PlayersCards = ({ cards, numCardsPerHand, displayCards=true, username='', positionTop=true}) => {
  if (cards && cards.length < 1) {
    cards = new Array(numCardsPerHand, true)
  }
  const styleContainer = positionTop ? styles.top : styles.bottom;

  return (
    <View style={styleContainer}>
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
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cards: {
    flexDirection: 'row',
    marginLeft: 100,
  },
  text: {
    textAlign: 'center',
  },
  container: {
    margin: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  top: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default PlayersCards;
