import { HigherOrLower } from "card-games-typescript";

export const initState = {
  game: {}, // class object for game HigherOrLower
  gameStatus: {
    dealMode: true,
    betMode: false,
    showMode: false,
    endMode: false,
  },
  cardsInDeck: 52,
}

export const rootReducer = (state=initState, action) => {
  switch(action.type) {
    case 'GAME_INIT':
      return gameInit(state, action);
    case 'GAME_DEAL':
      return gameDeal(state);
    case 'GAME_BET':
      return gameBet(state, action);
    case 'GAME_SHOWDOWN':
      return gameShowdown(state);
    case 'GAME_PAYOFF':
      return gamePayoff(state);
    case 'GAME_RESTART':
      return gameRestart(state);
    default:
      return state;  
  }
}

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
    gameStatus: {
      ...state.gameStatus,
      dealMode: false,
      betMode: true,
    },
  }
}

function gameBet(state, action) {
  state.game.setBets(action.payload.bets);  // changes happen inside the class object
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    gameStatus: {
      ...state.gameStatus,
      betMode: false,
    }
  }
}

function gameShowdown(state) {
  return {
    ...state,
    gameStatus: {
      ...state.gameStatus,
      betMode: false,
      showMode: true
    },
  }
}

function gamePayoff(state) {
  console.log(`setting game payoff`)
  state.game.payoff()  // changes happen inside the class object
  const newGame = Object.assign(  // this preserves the class methods
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
    gameStatus: {
      ...state.gameStatus,
      endMode: true,
      showMode: false,
    },
    cardsInDeck: state.cardsInDeck - 4,
  }
}

function gameRestart(state) {
  return {
    ...state,
    gameStatus: {
      ...state.gameStatus,
      endMode: false,
      showMode: false,
      dealMode: true
    }
  }
}
