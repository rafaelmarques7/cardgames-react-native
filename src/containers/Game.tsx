import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { 
  getPlayersCards, 
  actionGameDeal, 
  actionGameInit,
  actionGameBet,
  actionGamePayoff,
} from '../stateHandle/reducer';
import GameScreen from '../components/GameScreen';

const Game = (props) => {
  console.log('<Game /> props: ', props);
  return(
    <GameScreen />
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
