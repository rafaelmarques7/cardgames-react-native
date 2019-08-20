import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, Button, View } from 'react-native';
import { PlayerHighLow, Bet } from 'card-games-typescript';
import { 
  getPlayersCards, 
  actionGameDeal, 
  actionGameInit,
  actionGameBet,
  actionGamePayoff,
} from '../stateHandle/reducer';

const bet = new Bet('high', 2);

const Game = (props) => {
  console.log('dealer: ', props.game.dealer);
  console.log('player: ', props.game.players);
  return(
    <View
      style={{top:100}}>
    <Text>Hello</Text>
    <Button
      title="Init Game"
      onPress={() => {props.actionGameInit([new PlayerHighLow('rafael')], 2)}}
      />
    <Button
      title="Deal Cards"
      onPress={() => {props.actionGameDeal()}}
      />
    <Button
      title="Set Bet"
      onPress={() => {props.actionGameBet([bet])}}
      />
    <Button
      title="Set Payoff"
      onPress={() => {props.actionGamePayoff()}}
      />
    </View>

  );
}

const mapStateToProps = state => ({
  game: state.game,
  playerCards: getPlayersCards(state),
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameDeal,
    actionGameInit,
    actionGameBet,
    actionGamePayoff,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
