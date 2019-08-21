import { PlayerHighLow } from 'card-games-typescript';

const DEF_PLAYERS = [new PlayerHighLow('R7M')];
const DEF_NUM_CARDS_PER_HAND = 2;

export const startGame = (store) => {
  store.dispatch(actionGameInit(DEF_PLAYERS, DEF_NUM_CARDS_PER_HAND));
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

export const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})

export const actionGameBet = (bets) => {
  return dispatch => {
    // set bet action
    dispatch(actionBet(bets));
    // set payoff action, but delay it
    setTimeout(() => {
      dispatch(actionGamePayoff());
    }, 3000);
  }
}
