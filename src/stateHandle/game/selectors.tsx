import get from 'lodash.get';
import { getUserUsername } from '../user';

export const getPlayerInfo = (state) => ({
  username: getUserUsername(state),
  cards: getPlayersCards(state),
  creditAmmount: getPlayersCreditAmmount(state),
  valueHand: getCardsStrength(state),
  bet: getPlayersBet(state),
  betOn: state.game.betOn,
  isWinner: getRoundWinner(state),
  odds: getOdds(state),
})

/**
 * This selects the cards of the player.
 * If the player has no cards, it defaults 
 * to an array with length equal to the number of cards per hand.
 * This allows the handOfPlayer component to 
 * render the apropriate number of cards, in all situations.
 */
export const getPlayersCards = (state, indexPlayer=0) => {
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsPlayer = get(state.game, `game.players[${indexPlayer}].cards.cards`, []);
  return cardsPlayer.length > 0 ? cardsPlayer : defCards;
}

export const getDealerCards = (state) => { 
  const numCards = getNumberOfCardsPerHand(state);
  const defCards =  Array.from({length: numCards}, () => 0);
  const cardsDealer = state.game.game.dealer.cards.cards;
  return cardsDealer.length > 0 ? cardsDealer : defCards;
}

export const getDealerInfo = (state) => ({
  username: 'Dealer',
  cards: getDealerCards(state),
  creditAmmount: null,
  valueHand: getDealerCardsStrength(state),
  bet: null,
})

export const numRoundsPlayed = state => state.game.numRounds

export const getRoundWinner = state => state.game.game.isWinner(state.game.game.players[0])

export const getOdds = state => state.game.odds

export const shouldDisplayOdds = state => {
  const shouldDisplay = state.game.shouldDisplayOdds
  const dcs = getDealerCardsStrength(state)
  if (shouldDisplay && dcs && state.game.gameStatus !== 'deal') {
    return true
  }
}

export const getNumberOfCardsPerHand = (state) => state.game.game.numCardsPerHand

export const getDealerCardsStrength = (state) => state.game.game.dealer.cards.valueHand

export const getCardsStrength = (state, indexPlayer=0) => state.game.game.players[indexPlayer].cards.valueHand

export const getPlayersCreditAmmount = (state, indexPlayer=0) => state.game.game.players[indexPlayer].credit

const getPlayersBet = (state) => state.game.game.players[0].bet

export const getNumberCardsInDeck = (state) => state.game.cardsInDeck

export const getNumberOfRoundsPlayed = (state) => state.game.numRounds

