import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

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
      // if bottom, reverse the direction of container childs
      // leading the username to the bottom of the container
      flexDirection: bottom ? 'column-reverse' : 'column',
      margin: 5,
      backgroundColor: 'green',
      paddingBottom: bottom ? 20 : 0,
      paddingTop: !bottom ? 20: 0,
    },
    handContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      // if bottom, move cards to bottom of their containers flex
      alignItems: bottom ? 'flex-end' : 'flex-start',
    },
    cardContainer: {
      margin: 8,
    },
    textContainer: {
      alignSelf: 'stretch',
      // backgroundColor: 'yellow',
    },
    text: {
      textAlign: 'center',
    },
  });
}

export default PlayersCards;
