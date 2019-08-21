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
import { View, Button } from 'react-native';
import CreditPlayer from '../components/Credit';
import PlayerCards from '../components/PlayerCards';
import BetDisplay from '../components/Bet';
import { screen } from '../config';
import DealButton from '../components/Deal'; 

const Game = (props) => {
  props = {...props, screen}
  console.log('<Game /> props: ', props);
  return(
    <View>
      <CreditPlayer 
        ammount={props.player.creditAmmount} />
      <DealButton 
        callbackFunction={props.actionGameDeal}
        disabled={!props.gameStatus.dealMode} /> 
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={props.gameStatus.endMode}/>
      <BetDisplay 
        betMaximum={props.player.creditAmmount}
        onSetBet={(bet) => {props.actionGameBet([bet])}}
        acceptBets={props.gameStatus.betMode}
        
        />
      <PlayerCards 
        cards={props.player.cards} 
        username={props.player.username} />
    </View>
  );
}

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
