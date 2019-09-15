import { PlayerHighLow } from 'card-games-typescript' 
import { getUserUsername } from './userState';
import { 
  getRoundWinner, 
  getNumberOfCardsPerHand, 
  getPlayersCreditAmmount, 
  getNumberOfRoundsPlayed } from './gameState';
import { updateHighscore } from '../graphql/mutations';

/**
 * Action helper constants and functions
 */
const DEF_PLAYERS = [new PlayerHighLow('Player')];
const DEF_NUM_CARDS_PER_HAND = 1;

const actionGameInit = (players, numCardsPerHand) => ({
  type: 'GAME_INIT',
  payload: {
    players: players,
    numCardsPerHand: numCardsPerHand,
  }
});

const setNumberOfCards = (value) => ({
  type: 'SET_NUMBER_OF_CARDS',
  payload: {
    value: value,
  }
})

const setGameDeal = () => ({
  type: 'GAME_DEAL',
})

export const actionGameDeal = () => {
  return (dispatch) => {
    dispatch(setGameDeal())
    dispatch(setGameMode('bet')) // after deal comes bet
  } 
}

// gameMode must be 'deal', bet', 'show' or 'end'
const setGameMode = (gameMode) => ({
  type: 'SET_GAME_MODE',
  payload: {
    gameMode: gameMode
  }
})

const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})

const actionGameRestartRound = () => ({
  type: 'GAME_RESTART_ROUND',
})

const setBet = (bets) => ({
  type: 'GAME_BET',
  payload: {
    bets: bets, // except bets to be an array of valid bets
  }
})

const actionReduceLives = () => ({
  type: 'GAME_REDUCE_LIVES'
})

const resetStatusGame = () => ({
  type: 'RESET_STATUS_GAME'
})

const setHighscore = (points, numRounds) => ({
  type: 'SET_HIGHSCORE',
  payload: {
    points, 
    numRounds,
  }
})

/**
 * These exported actions will be used to move the game forward
 * and to trigger side-effects.
 * 
 */
export const startGame = (store) => {
  store.dispatch(actionGameInit(DEF_PLAYERS, DEF_NUM_CARDS_PER_HAND));
}

export const actionGameRestart = () => {
  return (dispatch, getState) => {
    // get number of cards so that user preferences are not overwritten
    const numCards = getNumberOfCardsPerHand(getState())
    // get username so it is not overwritten
    const username = getUserUsername(getState())
    // re-declare players; this is necessary to reset the credit 
    const players = [new PlayerHighLow(username)]
    dispatch(actionGameInit(players, numCards))
    dispatch(resetStatusGame())
  }
}

export const actionSetUserUsername = (username) => ({
  type: 'SET_USER_USERNAME',
  payload: {
    username: username,
  }
})

export const actionSetUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  payload: {
    email: email,
  }
})

export const actionUpdateHighscore = () => {
  return (dispatch, getState) => {
    const points = getPlayersCreditAmmount(getState())
    const numRounds = getNumberOfRoundsPlayed(getState())
    dispatch(setHighscore(points, numRounds))

    updateHighscore({id: 1, ownerId: 1, points: 0, numRounds: 1, date: Date.now().toString()})

  }
}

export const actionGameBet = (bets) => {
  return (dispatch, getState) => {  
    const TIMEOUT_RESTART_ROUND = 4000;

    dispatch(setGameMode('show'))
    dispatch(setBet(bets));

    setTimeout(() => {
      const playerIsWinner = getRoundWinner(getState())
      if (!playerIsWinner) {
        dispatch(actionReduceLives())
      }
    }, TIMEOUT_RESTART_ROUND/2);

    setTimeout(() => {
      dispatch(actionGamePayoff());
      dispatch(setGameMode('end'))
    }, TIMEOUT_RESTART_ROUND);

    setTimeout(() => {
      dispatch(actionGameRestartRound());
      dispatch(setGameMode('deal'))
    }, TIMEOUT_RESTART_ROUND+500) // this delay is necessary so that the card has time to flip.
  }
}

export const actionSetNumberOfCards = (value) => {
  return dispatch => {
    dispatch(actionGameRestartRound())
    dispatch(setNumberOfCards(value))
  }
}
