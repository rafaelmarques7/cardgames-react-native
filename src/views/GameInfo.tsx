import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { stylesApp } from '../styles'
import DeckOfCardsImg from '../components/DeckOfCards'
import TitleApp from '../components/TitleApp'
import HandOfPlayer from '../components/HandPlayer'
import BetDisplay from '../components/Bet'
import { ScrollView } from 'react-native-gesture-handler'

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
    console.log(this.state)
    return (
      <ScrollView style={stylesApp.fullScreen}>
        <TitleApp animate={false}/>
        <View style={{flex: 10}}>
          <Text style={{...stylesApp.textSubTitle, fontSize: 20}}>
            In this game, the player plays against the dealer.</Text>
          <Text style={{...stylesApp.textSubTitle, fontSize: 20}}>  
            When the players clicks on the deck
          </Text>
          <View style={styles.containerCards}>
            <DeckOfCardsImg
              disabled={false}
              callbackFunction={() => this.onDeckTap()}
              shakeAnimation={!this.state.showCardsDealer} />
          </View>

          <Text style={{...stylesApp.textSubTitle, fontSize: 20}}>
            The dealer receives their cards</Text>
 
          <View style={{flex: 1}}>
            <HandOfPlayer 
              player={this.state.dealer} 
              positionOnTop={true}
              displayCards={this.state.showCardsDealer} />
          </View>

          <View style={{flex: 1}}>
            <Text 
              style={{...stylesApp.textSubTitle, fontSize: 20}}>
              At this point, you place a bet.
            </Text>
            <Text 
              style={{...stylesApp.textSubTitle, fontSize: 20}}>
              The players bets that their cards is higher, lower, or the same value, as the dealers cards.
            </Text>
            
          </View>

          <BetDisplay 
            betOn={this.state.player.bet.betOn} 
            betValue={1000}
            acceptBets={this.state.showCardsDealer && !this.state.showCardsPlayer}
            onSetBet={(bet) => this.onSetBet(bet)} />

          <View style={{flex: 1}}>
            <HandOfPlayer 
              player={this.state.player} 
              displayCards={this.state.showCardsPlayer} />
          </View>

          <View style={{flex: 1}}>
            { (this.state.showCardsPlayer && this.state.player.bet.betOn === 'high') &&  
              <Text 
                style={{...stylesApp.textSubTitle, fontSize: 20}}>
                Congratulations. You just won your first bet!
              </Text>
            }
            { (this.state.showCardsPlayer && this.state.player.bet.betOn !== 'high') &&  
              <Text 
                style={{...stylesApp.textSubTitle, fontSize: 20}}>
              Unlucky, In this case, the player has the high card.  
              </Text>
            }            
          </View>

          <View style={{height:100}} />



        </View>
      </ScrollView>
    )
  }
} 

const styles = StyleSheet.create({
  containerCards: {
    alignSelf: 'center'
  }
})

export default GameInfoView
