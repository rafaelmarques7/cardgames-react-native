import React from 'react';
import { 
  actionGameDeal, 
  actionGameInit,
  actionGameBet,
  getPlayerInfo,
  getDealerInfo,
} from '../stateHandle';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import GameView from '../views/GameView';

const Game = (props) => {
  // console.log('<Game /> props: ', props);
  return(
    <GameView {...props} />
  );
}

const mapStateToProps = state => ({
  player: getPlayerInfo(state),
  dealer: getDealerInfo(state),
  gameStatus: state.gameStatus,
  cardsInDeck: state.cardsInDeck,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameDeal,
    actionGameInit,
    actionGameBet,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
