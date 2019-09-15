import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { 
  actionGameDeal, 
  actionGameBet,
  getPlayerInfo,
  getDealerInfo,
  actionSetUserUsername,
  getStatusGame,
  getNumberCardsInDeck,
} from '../stateHandle';
import GameView from '../views/GameView';

const Game = (props) => {
  console.log('<Game /> props: ', props.player, props.gameStatus);
  return(
    <GameView {...props} />
  );
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    player: getPlayerInfo(state),
    dealer: getDealerInfo(state),
    gameStatus: getStatusGame(state),
    cardsInDeck: getNumberCardsInDeck(state)
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameDeal,
    actionGameBet,
    actionSetUserUsername,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
