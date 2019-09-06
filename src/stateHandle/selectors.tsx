import get from 'lodash.get';

export const getDealerCards = (state) => { 
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsDealer = state.game.dealer.cards.cards;
  return cardsDealer.length > 0 ? cardsDealer : defCards;
} 

export const getPlayersBet = (state) => { 
  return state.game.players[0].bet
} 

export function getPlayersCards(state, indexPlayer=0) {
  // it may be a good idea to default to array with length equal to num cards
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsPlayer = get(state, `game.players[${indexPlayer}].cards.cards`);
  return cardsPlayer.length > 0 ? cardsPlayer : defCards;
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
  console.log('getNumCardsPerHand is returning: ', state.game.numCardsPerHand)
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