import { PlayerHighLow } from 'card-games-typescript';

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

export const actionGameRestart = () => ({
  type: 'GAME_RESTART',
})

export const actionGameBet = (bets) => {
  return dispatch => {  
    // set showdown action so that dealer shows their cards
    setTimeout(() => {
      console.log(`dispatch showdown`)
      dispatch(actionGameShowdown());
    }, 100);
    
    // set bet action after initiating showdown
    setTimeout(() => {
      console.log(`dispatch bet`)
      dispatch(actionBet(bets));
    }, 200);
    
    // set payoff action, but delay it
    setTimeout(() => {
      console.log(`dispatch payoff`)
      dispatch(actionGamePayoff());
    }, 1500);

    // restart game
    setTimeout(() => {
      console.log(`dispatch gameRestart`)
      dispatch(actionGameRestart());
    }, 7500);
  }
}
