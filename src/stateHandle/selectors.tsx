import get from 'lodash.get';

/**
 * This selects the cards of the player.
 * If the player has no cards, it defaults 
 * to an array with length equal to the number of cards per hand.
 * This allows the handOfPlayer component to 
 * render the apropriate number of cards, in all situations.
 */
export function getPlayersCards(state, indexPlayer=0) {
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsPlayer = get(state, `game.players[${indexPlayer}].cards.cards`);
  return cardsPlayer.length > 0 ? cardsPlayer : defCards;
}

export const getDealerCards = (state) => { 
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsDealer = state.game.dealer.cards.cards;
  return cardsDealer.length > 0 ? cardsDealer : defCards;
}

export const getPlayersBet = (state) => { 
  return state.game.players[0].bet
} 

export function getPlayersCreditAmmount(state, indexPlayer=0) {
  return state.game.players[indexPlayer].credit;
}

export function getPlayersUsername(state, indexPlayer=0) {
  return getUserUsername(state)
  // return state.game.players[indexPlayer].username;
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
    betOn: state.betOn,
    isWinner: getRoundWinner(state)
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

export const getPlayersLives = state => state.gameStatus.numLives

export const getPlayersDeaths = state => state.gameStatus.numDeaths

export const getRoundWinner = state => state.game.isWinner(state.game.players[0])

export const isPlayerLooser = state => state.gameStatus.numLives === 0

export const numRoundsPlayed = state => state.gameStatus.numRounds

export const isUserLoggedIn = state => state.user.email !== null
// export const isUserLoggedIn = state => true

export const getUserUsername = state => state.user.username

export const getUserEmail = state => state.user.email
