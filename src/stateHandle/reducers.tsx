import { HigherOrLower } from "card-games-typescript";

export const initState = {
  game: {}, // class object for game HigherOrLower
  gameStatus: {
    numLives: 3,
    numDeaths: 0,
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
    case 'SET_NUMBER_OF_CARDS':
      return gameSetNumberOfCards(state, action);
    case 'GAME_REDUCE_LIVES':
      return gameReduceLives(state);
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
   // changes happen inside the class object
   // the 2nd parameter has the effect of not decreasing the credit upon betting
  state.game.setBets(action.payload.bets, false); 
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
  // changes happen inside the class object
  state.game.payoff(false) // the bool is to rectify the payoff, as to not include the discount rate 
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

function gameSetNumberOfCards(state, action) {
  state.game.numCardsPerHand = action.payload.value;
  const newGame = Object.assign(
    Object.create(Object.getPrototypeOf(state.game)), state.game);
  return {
    ...state,
    game: newGame,
  }
}

function gameReduceLives(state) {
  return {
    ...state,
    gameStatus: {
      ...state.gameStatus,
      numLives: state.gameStatus.numLives - 1,
      numDeaths: state.gameStatus.numDeaths + 1
    }
  }
}