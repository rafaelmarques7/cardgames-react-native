import React from 'react';
import { 
  getPlayersCards,
  getPlayersUsername,
  getPlayersCreditAmmount, 
  actionGameDeal, 
  actionGameInit,
  actionGameBet,
  getDealerCards,
  getPlayersBet,
  getCardsStrength,
  getDealerCardsStrength,
  getNumberOfCardsPerHand,
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
  // gameStatus: state.gameStatus,
  // numCardsPerHand: getNumberOfCardsPerHand(state),
  cardsInDeck: state.cardsInDeck,
  // valueHand: getCardsStrength(state),
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
