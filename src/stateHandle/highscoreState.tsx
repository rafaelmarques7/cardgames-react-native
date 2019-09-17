import { API, graphqlOperation } from 'aws-amplify';
import { getHighscoreByPoints } from '../graphql/queries';
import { createHighscore } from '../graphql/mutations';
import uuid from 'uuid/v1'
import get from 'lodash.get';

type Highscore = {
  type: String, // primary partition key - set to same value on all data entries to allow sorting
  id: String, // hash
  ownerId: number, // playerID
  points: number, 
  numRounds: number,
  date: String
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
    }))
  } catch (e) {
    console.log('getWorldHighscores threw error: \n', e)
    return null    
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
      return onSuccess(data);
    } catch (e) {
      console.log('fetchHighscoreWorld threw error: \n', e);
      return null
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
  // points come from Api as negativevalues, so we need to change that
  let highscoresClean = []
  highscores.map((score) => {
    highscoresClean.push({
      ...score,
      points: -score.points,
    })
  })

  return {
    ...state,
    highscoresWorld: highscoresClean,
  }
}

function highscoreUpdate(state, action) {
  console.log(`inside highscoreUpdate`)
  // construct this games highscore based on payload
  const {  points, numRounds } = action.payload
  const date = new Date()
  const gameHighscore = { points, numRounds, date }
  // get all tracked highscores
  const allHighscores = [...state.highscores]
  // add this games highscore to highscore list
  allHighscores.push(gameHighscore)
  // sort from higest to minimum
  allHighscores.sort((a, b) => a.points > b.points)
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

function reduceHighscoreWorldUpdate(state, action) {
  console.log('inside reduceHighscoreWorldUpdate')

  const highscore = {
    type: 'Highscore',
    id: uuid(),
    ownerId: 0, // playerID
    points: action.payload.points, 
    numRounds: action.payload.numRounds,
    date: Date.now().toString(),
  }

  const response = updateWorldLeaderboard(highscore)
  console.log(response)

  return {
    ...state,
    highscoresWorld: [...state.highscoresWorld]
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
    case 'UPDATE_HIGHSCORE_WORLD':
      return reduceHighscoreWorldUpdate(state, action)
    case 'GET_HIGHSCORE_WORLD':
      return reduceHighscoreWorldGet(state, action)
    default:
      return state;  
  }
}

// state selectors
export const getHighscores = state => state.highscores.highscores

export const getHighscoresWorld = state => state.highscores.highscoresWorld
