import { PlayerHighLow } from "card-games-typescript";
import { getRoundWinner, getNumberOfCardsPerHand, getOdds } from "./selectors";
import { actionReduceLives, actionResetStatusGame } from "../statusGame";
import { getUserUsername } from "../user";

const DEF_PLAYERS = [new PlayerHighLow('Player')];
const DEF_NUM_CARDS_PER_HAND = 2;

/**
 * These exported actions will be used to move the game forward
 * and to trigger side-effects.
 * 
 */
export const startGame = (store) => {
  console.log('inside startGame')
  store.dispatch(actionGameInit(DEF_PLAYERS, DEF_NUM_CARDS_PER_HAND));
}

export const actionGameDeal = () => {
  return (dispatch) => {
    dispatch(setGameDeal())
    dispatch(setGameMode('bet')) // after deal comes bet
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
    }, TIMEOUT_RESTART_ROUND + 500) // this delay is necessary so that the card has time to flip.
  }
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
    dispatch(actionResetStatusGame())
  }
}

export const actionSetNumberOfCards = (value) => {
  return dispatch => {
    dispatch(setNumberOfCards(value))
    dispatch(actionGameRestart())
  }
}

export const actionSetShouldDisplayOdds = (bool) => {
  return dispatch => {
    dispatch(aShouldDisplayOdds(bool))
  }
}

const aShouldDisplayOdds = (value) => ({
  type: 'SHOULD_DISPLAY_ODDS',
  value,
});

const actionGameInit = (players, numCardsPerHand) => ({
  type: 'GAME_INIT',
  payload: {
    players: players,
    numCardsPerHand: numCardsPerHand,
  }
});

const setGameDeal = () => ({
  type: 'GAME_DEAL',
})

const setNumberOfCards = (value) => ({
  type: 'SET_NUMBER_OF_CARDS',
  payload: {
    value: Number(value),
  }
})

const setGameMode = (gameMode) => ({
  type: 'SET_GAME_MODE',
  payload: {
    gameMode: gameMode // gameMode must be 'deal', bet', 'show' or 'end'
  }
})

const setBet = (bets) => ({
  type: 'GAME_BET',
  payload: {
    bets: bets, // except bets to be an array of valid bets
  }
})


const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})

const actionGameRestartRound = () => ({
  type: 'GAME_RESTART_ROUND',
})
