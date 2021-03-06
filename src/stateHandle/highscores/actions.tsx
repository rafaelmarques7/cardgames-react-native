import { apiGetWorldHighscores, apiUpdateWorldHighscores } from "./api";
import { isHighscoreWorldWinner, buildHighscoreEntry } from "./selectors";
import { getPlayersCreditAmmount, getNumberOfRoundsPlayed } from "../game";
import { getUserUsername } from "../user";

/**
 * Function that makes an API call to the backend to GET 
 * the top highscores of all users.
 * After the call is complete, it dispatches an internal action
 * to update the redux store.
 */
export const actionGetHighscoreWorld = () => {
  return async dispatch => {
    function onSuccess(data) {
      dispatch(getHighscoreWorld(data));
      return data;
    }
    try {
      console.log('inside actionGetHighscoreWorld')
      const data = await apiGetWorldHighscores()
      return onSuccess(data);
    } catch (e) {
      console.log('actionGetHighscoreWorld threw error: \n', e);
    }
  }
}

/**
 * Function that makes an API call to update the backend API
 * leaderboard database.
 * This update is based on the 'current game'.
 * This update only runs if the 'current game' beats the top highscores.
 */
export const actionUpdateHighscoreWorld = () => {
  return async (dispatch, getState) => {
    try {
      console.log('inside actionUpdateHighscoreWorld')
      const highscore = buildHighscoreEntry(getState())
      await apiUpdateWorldHighscores(highscore) // update world leaderboard database
    } catch(e) {
      console.log('actionUpdateHighscoreWorld threw error: ', e)
    }
  }
}

export const actionUpdateHighscore = () => {
  return (dispatch, getState) => {
    const points = getPlayersCreditAmmount(getState())
    const numRounds = getNumberOfRoundsPlayed(getState())
    const username = getUserUsername(getState())
    dispatch(setHighscore(points, numRounds, username))
  }
}

const getHighscoreWorld = (data) => ({
  type: 'GET_HIGHSCORE_WORLD',
  payload: { 
    data
  }
})

const setHighscore = (points, numRounds, username) => ({
  type: 'SET_HIGHSCORE',
  payload: {
    points, 
    numRounds,
    username,
  }
})
