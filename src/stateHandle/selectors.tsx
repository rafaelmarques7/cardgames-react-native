import get from 'lodash.get';

export const getDealerCards = (state) => { 
  return state.game.dealer.cards.cards
} 

export const getPlayersBet = (state) => { 
  return state.game.players[0].bet
} 

export function getPlayersCards(state, indexPlayer=0) {
  // it may be a good idea to default to array with length equal to num cards
  return get(state, `game.players[${indexPlayer}].cards.cards`, [])
}

export function getPlayersCreditAmmount(state, indexPlayer=0) {
  return state.game.players[indexPlayer].credit;
}

export function getPlayersUsername(state, indexPlayer=0) {
  return state.game.players[indexPlayer].username;
}

export function getCardsStrength(state, indexPlayer=0) {
  return state.game.players[indexPlayer].cards.valueHand;
}

export function getDealerCardsStrength(state) {
  return state.game.dealer.cards.valueHand;
}

export function getNumberOfCardsPerHand(state) {
  return state.game.numCardsPerHand;
}

export function getPlayerInfo(state) {
  return {
    username: getPlayersUsername(state),
    cards: getPlayersCards(state),
    creditAmmount: getPlayersCreditAmmount(state),
    valueHand: getCardsStrength(state),
    bet: getPlayersBet(state),
  }
}

export function getDealerInfo(state) {
  return {
    username: 'Dealer',
    cards: getDealerCards(state),
    creditAmmount: null,
    valueHand: getDealerCardsStrength(state),
    bet: null,
  }
}