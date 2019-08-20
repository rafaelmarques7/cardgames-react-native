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
        disabled={props.isGameOnGoing} /> 
      <PlayerCards 
        cards={props.dealer.cards} 
        username={'Dealer'} 
        displayCards={false}/>
      {/* <BetDisplay {...props} /> */}
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
  },
  dealer: {
    cards: getDealerCards(state),
  },
  isGameOnGoing: state.isGameOnGoing,
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
