import { PlayerHighLow } from "card-games-typescript";

const DEFAULT_NUM_CARDS = 2;
const DEFAULT_PLAYERS = [new PlayerHighLow('R7M')];

export const startGame = (store) => {
  const players = [new PlayerHighLow('R7M')];
  const numCardsPerHand = 2;
  store.dispatch(actionGameInit(players, numCardsPerHand));
}

export const actionGameInit = (playersList=null, numCardsPerHand=null) => {
  playersList = playersList ? playersList : DEFAULT_PLAYERS;
  numCardsPerHand = numCardsPerHand ? numCardsPerHand : DEFAULT_NUM_CARDS;
  return dispatch => {
    dispatch(actionGameSetConfig)
  }
}

const actionGameSetConfig = (players, numCardsPerHand) => ({
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

export function actionGameBet(bets) {
  return dispatch => {
    // set bet action
    dispatch(actionBet(bets));
    // set payoff action, but delay it
    setTimeout(() => {
      dispatch(actionGamePayoff());
    }, 5000);
  }
}

export const actionGamePayoff = () => ({
  type: 'GAME_PAYOFF',
})


