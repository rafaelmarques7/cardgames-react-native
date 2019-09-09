import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import CardWithFlip from './CardWithFlip'
import BetDisplay from './Bet'
import { randomCard } from '../logic/misc'
import AnimationContainer from './AnimationContainer'
import { Card } from 'card-games-typescript'

class HomeCardAnimation extends React.Component {
  state = {
    cardPlayer: null,
    cardDealer: null,
    showPlayerCard: false,
    showDealerCard: false,
    playerIsWinner: false,
    displayTextWinner: false,
  }

  componentDidMount() {
    this.resetCards()
  }
  
  resetCards() {
    this.setState({
      cardPlayer: randomCard(),
      cardDealer: randomCard(),
    })
    setTimeout(this.toggleDealer.bind(this), 1000)
  }

  togglePlayer() {
    this.setState({showPlayerCard: !this.state.showPlayerCard})
  }

  toggleDealer() {
    this.setState({showDealerCard: !this.state.showDealerCard})
  }

  handleSetBet(bet) {
    this.handleWinner(bet)
    this.togglePlayer()
    setTimeout(this.togglePlayer.bind(this), 3000)
    setTimeout(this.toggleDealer.bind(this), 3000)
    setTimeout(this.resetCards.bind(this), 5000)
  }

  handleWinner(bet) {
    const cardP = new Card(this.state.cardPlayer.rank,this.state.cardPlayer.suite);
    const cardD = new Card(this.state.cardDealer.rank,this.state.cardDealer.suite);
    const playerIsWinner = 
      (bet.on == 'high' && cardP.value > cardD.value) ||
      (bet.on == 'low' && cardP.value < cardD.value) ||
      (bet.on == 'draw' && cardP.value === cardD.value);
    this.setState({
      playerIsWinner: playerIsWinner,
      displayTextWinner: true
    })
    setTimeout(() => {
      this.setState({
        playerIsWinner: false,
        displayTextWinner: false
      })
    }, 3000);
  }

  displayTextWinner() {
    const text = this.state.playerIsWinner ? 'You win!' : 'You lose.'
    return (
      <AnimationContainer 
        animate={true} 
        animationType="bounceIn"
        delay={0}>
        <Text style={styles.textWin}>{text}</Text>
      </AnimationContainer>
    )  
} 

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.containerTextWinner}>
          { this.state.displayTextWinner && this.displayTextWinner() }
        </View>
        <View style={styles.containerAction}>
          <View>
            <CardWithFlip
              cardObject={this.state.cardPlayer} 
              backOfDeck={false} 
              showCards={this.state.showPlayerCard}/>
          </View>
          <View>
            <AnimationContainer animate={true} duration={2000} delay={2000} count='infinite'>
              <BetDisplay 
                betValue={2}
                onSetBet={(bet) => this.handleSetBet(bet)}
                acceptBets={true}/>
            </AnimationContainer>
          </View>
          <View>
            <CardWithFlip
              cardObject={this.state.cardDealer} 
              backOfDeck={false} 
              showCards={this.state.showDealerCard}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTextWinner: {
    height: 40,
  },
  containerAction: {
    height: 600/4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textWin: {
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'white',
  }
})

export default HomeCardAnimation
