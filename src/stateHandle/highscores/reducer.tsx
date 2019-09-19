import get from 'lodash.get';

const initStateHighscores = { 
  highscores: [],
  highscoresWorld: [], 
}

const reduceWorldHighscore = (state, action) => {
  console.log('inside reduceHighscoreWorldGet')
  const highscores = get(action.payload.data, 'data.getHighscoreByPoints.items', [])
  return {
    ...state,
    highscoresWorld: highscores,
  }
}

const reducePersonalHighscore = (state, action) => {
  console.log(`inside highscoreUpdate`)
  const {  points, numRounds, username } = action.payload
  const gameHighscore = { 
    points, 
    numRounds, 
    date: `${new Date().toString()}`,
    user: { username }
  }
  const allHighscores = [...state.highscores] // get all tracked highscores
  allHighscores.push(gameHighscore) // add this games highscore to highscore list
  allHighscores.sort((a, b) => a.points < b.points) // sort from highest to lowest
  if (allHighscores.length > 10) {   // track only 10 highscores
    allHighscores.pop()
  }
  return {
    ...state,
    highscores: allHighscores
  }
}

/**
 * This is the 'highscore' reducer.
 * The 'combineReducer' function must use the keyword 'highscore'
 * on this reducer for the respetive selectors to work correctly.
 *  
 */
export const highscoreReducer = (state=initStateHighscores, action) => {
  switch(action.type) {
    case 'SET_HIGHSCORE':
      return reducePersonalHighscore(state, action)
    case 'GET_HIGHSCORE_WORLD':
      return reduceWorldHighscore(state, action)
    default:
      return state;  
  }
}
