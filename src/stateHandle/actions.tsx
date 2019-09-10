import { PlayerHighLow } from 'card-games-typescript' 
import { getRoundWinner, getNumberOfCardsPerHand, getUserUsername } from './selectors';

export const DEF_PLAYERS = [new PlayerHighLow('Player')];
export const DEF_NUM_CARDS_PER_HAND = 1;

export const startGame = (store) => {
  store.dispatch(actionGameInit(DEF_PLAYERS, DEF_NUM_CARDS_PER_HAND));
}

export const setNumberOfCards = (value) => ({
  type: 'SET_NUMBER_OF_CARDS',
  payload: {
    value: value,
  }
})

export const actionSetNumberOfCards = (value) => {
  return dispatch => {
    dispatch(actionGameRestartRound())
    setTimeout(() => {
      dispatch(setNumberOfCards(value))
    }, 100);
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

export const actionBet = (bets) => ({
  type: 'GAME_BET',
  payload: {
    bets: bets, // except bets to be an array of valid bets
  }
})

export const actionGameShowdown = () => ({
  type: 'GAME_SHOWDOWN',
})

export const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})

export const actionGameRestartRound = () => ({
  type: 'GAME_RESTART_ROUND',
})



export const actionGameBet = (bets) => {
  return (dispatch, getState) => {  
    const TIMEOUT_RESTART_ROUND = 5000;

    console.log('dispatching actionGameShowdown\ndispatching actionBet');
    dispatch(actionGameShowdown());
    dispatch(actionBet(bets));

    console.log(`set timeout ${TIMEOUT_RESTART_ROUND} ms to dispatch round management actions`);
    setTimeout(() => {
      const playerIsWinner = getRoundWinner(getState())
      if (!playerIsWinner) {
        console.log('dispatch reduce lives')
        dispatch(actionReduceLives())
      }
      console.log(`dispatch payoff`)
      dispatch(actionGamePayoff());
      dispatch(actionGameRestartRound());
    }, TIMEOUT_RESTART_ROUND);

  }
}

export const actionReduceLives = () => ({
  type: 'GAME_REDUCE_LIVES'
})

export const actionGameRestart = () => {
  return (dispatch, getState) => {
    // get number of cards so that user preferences are not overwritten
    const numCards = getNumberOfCardsPerHand(getState())
    // get username so it is not overwritten
    const username = getUserUsername(getState())
    // re-declare players; this is necessary to reset the credit 
    const players = [new PlayerHighLow(username)]
    console.log('dispatch actionGameInit (restart)')
    dispatch(actionGameInit(players, numCards))
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
