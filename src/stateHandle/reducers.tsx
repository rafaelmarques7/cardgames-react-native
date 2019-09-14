import { HigherOrLower } from "card-games-typescript";
import { getPlayerInfo, getPlayersCreditAmmount } from "./selectors";
import { combineReducers } from "redux";

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
  betOn: 'pass',
  cardsInDeck: 52,
  highscores: [],
}

const initStateHighscores = { 
  highscores: [],
}

const gameReducer = (state=initState, action) => {
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
    // case 'HIGHSCORE':
    //   return highscoreUpdate(state)
    default:
      return state;  
  }
}

const highscoreReducer = (state=initStateHighscores, action) => {
  console.log('inside highscoreReducer')
  switch(action.type) {
    case 'HIGHSCORE':
        return highscoreUpdate(state, action)
      default:
        return state;  
  }
}

export const rootReducer = combineReducers({
  game: gameReducer,
  highscores: highscoreReducer
})

function gameInit(state, action) {
  const game = new HigherOrLower(action.payload.players, action.payload.numCardsPerHand)
  return {
    ...initState,
    user: {
      ...state.user,
      username: game.players[0].username,
    },
    game: game ,
    highscores: [
      ...state.highscores
    ]
  }
}

function gameDeal(state) {
  console.log('inside deal');
  if (state.cardsInDeck < state.game.numCardsPerHand * 2) {
    console.log('rebuilding deck')
    state.game.deck.buildDeck()
    state.game.deck.shuffleDeck()
  }
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
    betOn: action.payload.bets[0].on, 
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
    cardsInDeck: state.game.deck.deck.length,
  }
}

function gameRestartRound(state) {
  console.log('inside gameRestartRound')
  return {
    ...state,
    betOn: 'pass',
    gameStatus: {
      ...state.gameStatus,
      dealMode: true,
      endMode: false,
      betMode: false,
      showMode: false,
      numRounds: state.gameStatus.numRounds + 1
    }
  }
}

function gameSetNumberOfCards(state, action) {
  console.log('inside gameSetNumberOfCards')
  state.game.numCardsPerHand = action.payload.value;
  // overwrite the cards, so that it triggers re-render
  state.game.players[0].cards.cards = [];
  state.game.dealer.cards.cards = [];
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

function highscoreUpdate(state, action) {
  console.log(`inside highscore update`)
  const {  points, numRounds } = action.payload
  const date = new Date()
  const score = { points, numRounds, date }
  const scores = [...state.highscores]
  scores.push(score)
  scores.sort((a, b) => a.points > b.points)
  if (scores.length > 10) {
    scores.pop()
  }

  return {
    ...state,
    highscores: scores
  }
}
