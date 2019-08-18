import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { HigherOrLower, PlayerHighLow, Payoffs, Bet } from "card-games-typescript";
import CreditPlayer from './Credit';
import PlayerCards from './PlayerCards';
import BetDisplay from './Bet';

interface GameScreenState {
  game: HigherOrLower,
  payoffRates: Payoffs,
  shouldDeal: boolean,
  shouldBet: boolean,
  shouldPayoff: boolean,
}

class GameScreen extends React.Component<{}, GameScreenState> {
  constructor(props) {
    super(props);
    const players = new PlayerHighLow();
    const numCardsPerHand = 2;
    const game = new HigherOrLower([players], numCardsPerHand);
    game.deal();
    const bet = new Bet('draw', 1);
    game.setBets([bet]);

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    console.log(`width: ${width}, height: ${height}`);

    this.state = {
      game: game,
      payoffRates: game.payoffRates,
      shouldDeal: true,
      shouldBet: false,
      shouldPayoff: false,
    }
  }

  render() {
    const { game, payoffRates } = this.state;
    const credit = game.players[0].credit;

    return(
      <View>
        <CreditPlayer credit={credit} />
        <PlayerCards player={game.dealer} displayCards={true} />
        <BetDisplay bet={game.players[0].bet} payoffRates={payoffRates} />
        <PlayerCards player={game.players[0]} displayCards={true} />
      </View>
    )
  }
}

export default GameScreen;
