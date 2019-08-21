import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { 
  getPlayersCards,
  getPlayersUsername,
  getPlayersCreditAmmount, 
  actionGameDeal, 
  actionGameInit,
  actionGameBet,
  actionGamePayoff,
  getDealerCards,
  getPlayersBet,
} from '../stateHandle';
import { View, StyleSheet } from 'react-native';
import CreditPlayer from '../components/Credit';
import PlayerCards from '../components/PlayerCards';
import BetDisplay from '../components/Bet';
import { screen } from '../config';
import DealButton from '../components/Deal'; 

const Game = (props) => {
  props = {...props, screen}
  console.log('<Game /> props: ', props);
  return(
    <View style={styles.container}>
      <CreditPlayer 
        ammount={props.player.creditAmmount} />
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} />
      <DealButton 
        callbackFunction={props.actionGameDeal}
        disabled={!props.gameStatus.dealMode} /> 
      <BetDisplay 
        betMaximum={props.player.creditAmmount}
        onSetBet={(bet) => {props.actionGameBet([bet])}}
        acceptBets={props.gameStatus.betMode} />
      <PlayerCards 
        cards={props.player.cards} 
        username={props.player.username} 
        displayCards={props.gameStatus.betMode || props.gameStatus.endMode}
        numCardsPerHand={props.numCardsPerHand} 
        positionTop={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
})


const mapStateToProps = state => ({
  player: {
    cards:  getPlayersCards(state),
    creditAmmount: getPlayersCreditAmmount(state),
    username: getPlayersUsername(state),
    bet: getPlayersBet(state),
  },
  dealer: {
    cards: getDealerCards(state),
  },
  gameStatus: state.gameStatus,
  numCardsPerHand: state.game.numCardsPerHand,
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameDeal,
    actionGameInit,
    actionGameBet,
    // actionGamePayoff,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
