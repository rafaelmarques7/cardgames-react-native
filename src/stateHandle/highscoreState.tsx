import { API, graphqlOperation } from 'aws-amplify';
import { getHighscoreByPoints } from '../graphql/queries';
import { createHighscore } from '../graphql/mutations';
import uuid from 'uuid/v1'
import get from 'lodash.get';
import { getPlayersCreditAmmount, getNumberOfRoundsPlayed } from './gameState';
import { getUserId, getUserUsername } from './userState';

type Highscore = {
  type: String, // primary partition key - set to same value on all data entries to allow sorting
  points: number, 
  numRounds: number,
  date: String,
  highscoreUserId: String,
}

const initStateHighscores = { 
  highscores: [],
  highscoresWorld: [], 
}

/**
 * Api integration functions
 * 
 */
export async function apiGetWorldHighscores(limit=10) {
  console.log('inside apiGetWorldHighscores')
  try {
    return await API.graphql(graphqlOperation(getHighscoreByPoints, {
      type: 'Highscore', // tpye is the partition key, that should be set to 'Highscore' on all entries
      limit: limit,
      sortDirection: "DESC",
    }))
  } catch (e) {
    console.log('apiGetWorldHighscores thre error: \n',e)
  } 
}

export async function apiUpdateWorldHighscores(highscore: Highscore) {
  console.log('inside apiUpdateWorldHighscores')
  try {
    return await API.graphql(graphqlOperation(createHighscore, {
      input: {
        ...highscore
      }
    }))
  } catch(e) {
    console.log('updateWorldLeaderboard threw error: \n', e)
    return null
  }
}

/**
 * Action creators
 * 
 */
export const actionSetHighscoreWorld = (points, numRounds) => ({
  type: 'SET_HIGHSCORE_WORLD',
  payload: {
    points, 
    numRounds,
  }
})

export const actionGetHighscoreWorld = (data) => ({
  type: 'GET_HIGHSCORE_WORLD',
  payload: { 
    data
  }
})

export const fetchHighscoreWorld = () => {
  return async dispatch => {
    function onSuccess(data) {
      dispatch(actionGetHighscoreWorld(data));
      return data;
    }
    try {
      console.log('inside fetchHighscoreWorld')
      const data = await apiGetWorldHighscores()
      // console.log('fetchHighscoreWorld', data)
      return onSuccess(data);
    } catch (e) {
      console.log('fetchHighscoreWorld threw error: \n', e);
      return null
    }
  }
}

export const actionUpdateHighscoreWorld = () => {
  return async (dispatch, getState) => {
    try {
      console.log('inside actionUpdateHighscoreWorld')
      // logic to determine if update is requires
      const isWinner = isHighscoreWorldWinner(getState())
      const shouldUpdate = isWinner.isWinner

      if (shouldUpdate) {
        console.log('found a winner!')
        // data to put
        const points = getPlayersCreditAmmount(getState())
        const numRounds = getNumberOfRoundsPlayed(getState())
        const highscore = {
          type: 'Highscore',
          points: points,
          numRounds,
          date: `${new Date().toString()}`,
          highscoreUserId: getUserId(getState()),
        }
        // update backend and own app state
        await apiUpdateWorldHighscores(highscore) // update world leaderboard database
        // dispatch(fetchHighscoreWorld()) // update world leaderboard state
      }
    } catch(e) {
      console.log('actionUpdateHighscoreWorld threw error: ', e)
    }
  }
}

/**
 * State manipulation functions
 * 
 */
const reduceHighscoreWorldGet = (state, action) => {
  console.log('inside reduceHighscoreWorldGet')
  const highscores = get(action.payload.data, 'data.getHighscoreByPoints.items', [])
  return {
    ...state,
    highscoresWorld: highscores,
  }
}

function highscoreUpdate(state, action) {
  console.log(`inside highscoreUpdate`)
  // construct this games highscore based on payload
  const {  points, numRounds, username } = action.payload
  const gameHighscore = { 
    points, 
    numRounds, 
    date: `${new Date().toString()}`,
    user: { username }
  }
  // get all tracked highscores
  const allHighscores = [...state.highscores]
  // add this games highscore to highscore list
  allHighscores.push(gameHighscore)
  // sort from highest to lowest
  allHighscores.sort((a, b) => a.points < b.points)
  // track only 10 highscores
  if (allHighscores.length > 10) {
    allHighscores.pop()
  }
  // update state
  return {
    ...state,
    highscores: allHighscores
  }
}


/**
 * This is the 'highscore' reducer.
 * The 'combineReducer' function must use the keyword 'highscore'
 * on this reducer for the selectors below to work correctly.
 *  
 */
export const highscoreReducer = (state=initStateHighscores, action) => {
  switch(action.type) {
    case 'SET_HIGHSCORE':
      return highscoreUpdate(state, action)
    // case 'SET_HIGHSCORE_WORLD':
    //   return reduceHighscoreWorldUpdate(state, action)
    case 'GET_HIGHSCORE_WORLD':
      return reduceHighscoreWorldGet(state, action)
    default:
      return state;  
  }
}

// state selectors
export const getHighscores = state => state.highscores.highscores

export const getHighscoresWorld = state => state.highscores.highscoresWorld

export const isHighscoreWorldWinner = (state) => {
  const points = getPlayersCreditAmmount(state)
  const highscores = getHighscoresWorld(state)
  const isWinner =  highscores.length < 10 || points > highscores[highscores.length-1].points
  let index = highscores.length // base position for the case in which highscores.length < 10
  // determine highscore index
  if (isWinner) {
    for (var i=0; i<highscores.length; i+=1) {
      if (points > highscores[i].points) {
        console.log({ isWinner, index: i+1 })
        return { isWinner, index: i+1 }
      }
    }
  }
  return { isWinner, index }
}