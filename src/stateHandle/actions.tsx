import { PlayerHighLow } from 'card-games-typescript' 
import { getRoundWinner, getNumberOfCardsPerHand, getUserEmail } from './selectors';
import Amplify, { API } from 'aws-amplify';

export const DEF_PLAYERS = [new PlayerHighLow('Player')];
export const DEF_NUM_CARDS_PER_HAND = 1;

export const startGame = (store) => {
  store.dispatch(actionGameInit(DEF_PLAYERS, DEF_NUM_CARDS_PER_HAND));
}

export const actionSetNumberOfCards = (value) => ({
  type: 'SET_NUMBER_OF_CARDS',
  payload: {
    value: value,
  }
})

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
    // getData()
    createUser(getUserEmail(getState()))
    
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
    // re-declare user; this is necessary to reset the credit 
    const players = [new PlayerHighLow('Player')];
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

// // this function is not
// async function getUser(email) {
//   console.log(`inside getData`)
//   let apiName = 'guessWhatApi';
//   let path = `/users/${email}`; 
//   let myInit = {}
//   API.get(apiName, path, myInit).then(response => {
//       console.log('response ',response)
//   }).catch(error => {
//       console.log(error.response)
//   });  
// }

// // this function is working
// async function createUser(username) {
//   console.log(`inside createUser`)
//   let apiName = 'guessWhat';
//   let path = '/users'; 
//   let myInit = {
//     body: {
//       username: username
//     }
//   }
//   API.post(apiName, path, myInit).then(response => {
//       // Add your code here
//       console.log('response ',response)
//   }).catch(error => {
//       console.log('createUser threw error: ')
//       console.log(error)
//   });  
// }
