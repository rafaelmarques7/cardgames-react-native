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
} from '../stateHandle';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import GameView from '../views/GameView';

const Game = (props) => {
  console.log('<Game /> props: ', props);
  return(
    <GameView {...props} />
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
    valueHand: getDealerCardsStrength(state),
  },
  gameStatus: state.gameStatus,
  numCardsPerHand: state.game.numCardsPerHand,
  cardsInDeck: state.cardsInDeck,
  valueHand: getCardsStrength(state),
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
