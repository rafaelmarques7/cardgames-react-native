import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { stylesApp } from '../styles'
import DeckOfCardsImg from '../components/DeckOfCards'
import TitleApp from '../components/TitleApp'
import HandOfPlayer from '../components/HandPlayer'
import BetDisplay from '../components/Bet'
import { ScrollView } from 'react-native-gesture-handler'
import { screen } from '../config'
import AnimationContainer from '../components/AnimationContainer'

class GameInfoView extends React.Component {
  state = {
    player: {
      username: 'player',
      cards: [{rank: 'A', suite: 'hearts'}],
      bet: {betOn: 'pass'},
    }, 
    dealer: {
      username: 'dealer',
      cards: [{rank: '2', suite: 'clubs'}],
    },
    showCardsPlayer: false,
    showCardsDealer: false
  }

  onDeckTap = () => this.setState({showCardsDealer: !this.state.showCardsDealer})

  onSetBet = (bet) => {
    this.setState({
      showCardsPlayer: !this.state.showCardsPlayer,
      player: {
        ...this.state.player,
        bet: {betOn: bet.on}
      }
    })
  }

  render() {
    return (
      <ScrollView style={stylesApp.fullScreen}>
        <TitleApp animate={false}/>
        <View>
          <View style={styles.containerText}>
            <Text style={styles.textInfo}>
              In this game, the dealer and player are dealt one or more cards. {'\n\n'}
              The dealer shows their hand first. The player now has to guess if their 
              cards are higher, lower, or of the same value as the dealers.{'\n\n'}
              If the player guesses right, their coins are doubled. 
              If the player guesses wrong, they loose a life.{'\n\n'}
              Unlike cats, players only have 3 lifes, so be careful, and good luck!
              If you still have questions, see the example below.
            </Text>
          </View>
          <View style={styles.containerExample}>
            <Text style={styles.textInfo}>  
              When the players clicks on the deck,
            </Text>
            <View 
              style={styles.containerCards}>
              <DeckOfCardsImg
                disabled={false}
                callbackFunction={() => this.onDeckTap()}
                shakeAnimation={!this.state.showCardsDealer} />
            </View>
            <Text style={styles.textInfo}>
              The dealer shows their cards</Text>
            <View style={{flex: 1, marginTop: 20}}>
              <HandOfPlayer 
                player={this.state.dealer} 
                positionOnTop={true}
                displayCards={this.state.showCardsDealer} />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textInfo}>
                At this point, the player places a bet. {'\n'}
                Is the players card higher, lower or the same value as the dealer?</Text>
            </View>
            <View style={{flex: 1, width: screen.width*0.8, alignSelf: 'center', marginTop: 20}}>
              <BetDisplay 
                betOn={this.state.player.bet.betOn} 
                betValue={1000}
                acceptBets={this.state.showCardsDealer && !this.state.showCardsPlayer}
                onSetBet={(bet) => this.onSetBet(bet)} />
            </View>
            <View style={{flex: 1, marginTop: 20}}>
              <HandOfPlayer 
                player={this.state.player} 
                displayCards={this.state.showCardsPlayer} />
            </View>
            <View style={styles.containerText}>
              { !this.state.showCardsPlayer &&
                <Text style={styles.textInfo}>
                  If you guess carefully, you might just win.</Text>                
              }
              { (this.state.showCardsPlayer && this.state.player.bet.betOn === 'high') &&  
                <Text style={styles.textInfo}>
                  Congratulations. You guessed right</Text>
              }
              { (this.state.showCardsPlayer && this.state.player.bet.betOn !== 'high') &&  
                <Text style={styles.textInfo}>
                  Ah, you guessed wrong. In this case, the player has the high card.</Text>
              }            
            </View>
            <AnimationContainer
              style={{flex:1, width: screen.width*0.4, alignSelf: 'center', marginTop: 20}}
              animate={true} animationType='rubberBand' iterationDelay={3200} iterationCount='infinite'>
              <Button title="Play Game" onPress={()=>this.props.navigation.push('Game')} />
            </AnimationContainer>
            <View style={{height:100}} />
          </View>
        </View>
      </ScrollView>
    )
  }
} 

const styles = StyleSheet.create({
  containerCards: {
    alignSelf: 'center'
  },
  containerText: {
    // flex: 10, 
    marginTop: 20, 
    marginLeft: 40, 
    marginRight: 40
  },
  containerExample: {
    marginTop: 20
  },
  textInfo: {
    ...stylesApp.textSubTitle, 
    fontSize: 20, 
    textAlign: 'center',
    lineHeight: 27,
}
})

export default GameInfoView
