const initStateHighscores = { 
  highscores: [], // placeholder
}

// state manipulation functions
function highscoreUpdate(state, action) {
  console.log(`inside highscoreUpdate`)
  // construct this games highscore based on payload
  const {  points, numRounds } = action.payload
  const date = new Date()
  const gameHighscore = { points, numRounds, date }
  // get all tracked highscores
  const allHighscores = [...state.highscores]
  console.log(allHighscores)
  console.log(gameHighscore)
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
    case 'SET_HIGHSCORE_WORLD':
      return state
    case 'GET_HIGHSCORE_WORLD':
      return state
    default:
      return state;  
  }
}

// state selectors
export const getHighscores = state => {
  console.log('getHighscores: ', state)
  return state.highscores.highscores
}
