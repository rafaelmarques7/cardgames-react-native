import { HigherOrLower } from "card-games-typescript";

const gameInitState = {
  game: {}, // class object for game HigherOrLower
  betOn: 'pass',
  cardsInDeck: 52,
  numRounds : 0,
}

/**
 * This is the 'game' reducer.
 * The 'combineReducer' function must use the keyword 'game'
 * on this reducer for the selectors below to work correctly.
 *  
 */
export const gameReducer = (state=gameInitState, action) => {
  // console.log('inside gameReducer, state:', state)
  switch(action.type) {
    case 'GAME_INIT':
      return gameInit(action);
    case 'GAME_DEAL':
      return gameDeal(state);
    case 'GAME_BET':
      return gameBet(state, action);
    case 'GAME_PAYOFF':
      return gamePayoff(state);
    case 'GAME_RESTART_ROUND':
      return gameRestartRound(state);
    case 'SET_NUMBER_OF_CARDS':
      return gameSetNumberOfCards(state, action);
    default:
      return state;  
  }
}

/**
 * State manipulation functions
 *  
 */
function gameInit(action) {
  console.log('inside gameInit')
  const { players, numCardsPerHand } = action.payload
  const game = new HigherOrLower(players, numCardsPerHand) // create new game
  return {
    ...gameInitState, // overwrite any previously existing game state
    game: game ,
  }
}

function gameDeal(state) {
  console.log('inside gameDeal');
  // rebuild deck if there are not enough cards to deal
  if (state.cardsInDeck < state.game.numCardsPerHand * 2) {
    console.log('rebuilding deck')
    state.game.deck.buildDeck()
    state.game.deck.shuffleDeck()
  }
  // changes happen inside the class object
  state.game.deal();
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
  }
}

function gameBet(state, action) {
  console.log('inside gameBet')
   // changes happen inside the class object
   // the 2nd parameter has the effect of not decreasing the credit upon betting
  state.game.setBets(action.payload.bets, false); 
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    betOn: action.payload.bets[0].on, 
  }
}

function gamePayoff(state) {
  console.log(`setting game payoff`)
  // changes happen inside the class object
  state.game.payoff(false) // the boolean is to rectify the payoff, as to not include the discount rate 
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    cardsInDeck: newGame.deck.deck.length,
  }
}

function  gameRestartRound(state) {
  console.log('inside gameRestartRound')
  return {
    ...state,
    betOn: 'pass',
    numRounds: state.numRounds + 1
  }
}

function gameSetNumberOfCards(state, action) {
  console.log('inside gameSetNumberOfCards')
  state.game.numCardsPerHand = action.payload.value;
  // overwrite the cards, so that it triggers re-render
  state.game.players[0].cards.cards = [];
  state.game.dealer.cards.cards = [];
  // set the number of cards inside the game object
  const newGame = Object.assign(
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
  }
}
