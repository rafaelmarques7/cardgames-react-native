import { HigherOrLower } from "card-games-typescript";

export const NUM_LIVES_INITIAL = 3

export const initState = {
  game: {}, // class object for game HigherOrLower
  user: {
    email: null,
    username: 'Player',
  },
  gameStatus: {
    numRounds: 0,
    numLives: NUM_LIVES_INITIAL,
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
    case 'GAME_RESTART_ROUND':
      return gameRestartRound(state);
    case 'SET_NUMBER_OF_CARDS':
      return gameSetNumberOfCards(state, action);
    case 'GAME_REDUCE_LIVES':
      return gameReduceLives(state);
    case 'SET_USER_USERNAME':
        return setUserUsername(state, action)
      case 'SET_USER_EMAIL':
        return setUserEmail(state, action)
    default:
      return state;  
  }
}

function gameInit(state, action) {
  return {
    ...initState,
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

function gameRestartRound(state) {
  return {
    ...state,
    gameStatus: {
      ...state.gameStatus,
      endMode: false,
      showMode: false,
      dealMode: true,
      numRounds: state.gameStatus.numRounds + 1
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

function setUserUsername(state, action) {
  console.log('setUserUsername: ', action)
  return {
    ...state,
    user: {
      ...state.user,
      username: action.payload.username
    }
  }
}

function setUserEmail(state, action) {
  console.log('setUserEmail: ', action)
  return {
    ...state,
    user: {
      ...state.user,
      email: action.payload.email
    }
  }
} 	
