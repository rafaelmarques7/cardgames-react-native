import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DeckOfCards } from 'cardgames';
import { Card } from './Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: new DeckOfCards(52),
      playersCard: null,
    }
    this.state.deck.shuffleDeck();
  }
  
  onCardDeckPress() {
    const card = this.state.deck.drawCard();
    console.log(`Card drawned: ${JSON.stringify(card)}`);
    this.setState({
      playersCard: card,
    })
  }

  render() {
    const { playersCard } = this.state;
    console.log(`playersCard: ${JSON.stringify(playersCard)}`)
    
    return (
      <View style={styles.container}>
        <TouchableOpacity             
          onPress={() => {this.onCardDeckPress()}}>
          <Card 
            backOfDeck={true} 
            />
          {
            playersCard &&
            <Card 
              cardObject={playersCard}
            />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009900",
  },
});

export default App;
