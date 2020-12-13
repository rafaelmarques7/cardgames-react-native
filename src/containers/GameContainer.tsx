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
  getOdds,
} from '../stateHandle';
import GameView from '../views/GameView';

const Game = (props) => <GameView {...props} />

const mapStateToProps = state => ({
  odds: getOdds(state),
  player: getPlayerInfo(state),
  dealer: getDealerInfo(state),
  gameStatus: getStatusGame(state),
  cardsInDeck: getNumberCardsInDeck(state)
})

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
