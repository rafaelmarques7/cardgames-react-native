import { HigherOrLower, PlayerHighLow } from 'card-games-typescript';

export const initState = {
  game: {}, // class object for game HigherOrLower
  isGameOnGoing: false, // boolean to determine if a round is currently being played
}

export const startGame = (store) => {
  const players = [new PlayerHighLow('R7M')];
  const numCardsPerHand = 2;
  store.dispatch(actionGameInit(players, numCardsPerHand));
}

export const rootReducer = (state=initState, action) => {
  switch(action.type) {
    case 'GAME_INIT':
      return gameInit(state, action);
    case 'GAME_DEAL':
      return gameDeal(state);
    case 'GAME_BET':
      return gameBet(state, action);
    case 'GAME_PAYOFF':
      return gamePayoff(state);
    default:
      return state;  
  }
}

export const actionGameInit = (players, numCardsPerHand) => ({
  type: 'GAME_INIT',
  payload: {
    players: players,
    numCardsPerHand: numCardsPerHand,
  }
});

export const actionGameDeal = () => ({
  type: 'GAME_DEAL',
})

export const actionGameBet = (bets) => ({
  type: 'GAME_BET',
  payload: {
    bets: bets, // except bets to be an array of valid bets
  }
})

export const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})


function gameInit(state, action) {
  return {
    ...state,
    game: new HigherOrLower(
      action.payload.players, action.payload.numCardsPerHand)
  }
}

function gameDeal(state) {
  state.game.deal();  // changes happen inside the class object
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    isGameOnGoing: true,
  }
}

function gameBet(state, action) {
  state.game.setBets(action.payload.bets);  // changes happen inside the class object
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
  }
}

function gamePayoff(state) {
  state.game.payoff()  // changes happen inside the class object
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    isGameOnGoing: false,
  }
}

export const getDealerCards = (state) => { return state.game.dealer.cards.cards } 

export const getPlayersBet = (state) => { return state.game.players[0].bet } 


export function getPlayersCards(state, indexPlayer=0) {
  if (state.game.players && state.game.players[indexPlayer]) {
    return state.game.players[indexPlayer].cards.cards
  }
  return [];
}

export function getPlayersCreditAmmount(state, indexPlayer=0) {
  return state.game.players[indexPlayer].credit;
}

export function getPlayersUsername(state, indexPlayer=0) {
  return state.game.players[indexPlayer].username;
}