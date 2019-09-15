const statusGameInitState = {
  numLives: 3,
  numDeaths: 0,
  dealMode: true, // start game in 'Deal' mode
  betMode: false,
  showMode: false,
  endMode: false,
}

/**
 * These are state manipulation functions
 * 
 */ 
const resetStatusGame = () => ({...statusGameInitState})

const gameReduceLives = (state) => ({
  ...state,
  numLives: state.numLives - 1,
  numDeaths: state.numDeaths + 1
})

const setGameMode = (state, action) => ({
  ...state,
  dealMode: action.payload.gameMode === 'deal' ? true : false,
  betMode: action.payload.gameMode === 'bet' ? true : false,
  showMode: action.payload.gameMode === 'show' ? true : false,
  endMode: action.payload.gameMode === 'end' ? true : false,
})

/**
 * This is the 'statusGame' reducer.
 * The 'combineReducer' function must use the keyword 'statusGame'
 * on this reducer for the selectors below to work correctly.
 *  
 */
export const statusGameReducer = (state=statusGameInitState, action) => {
  switch(action.type) {
    case 'RESET_STATUS_GAME': 
      return resetStatusGame()
    case 'GAME_REDUCE_LIVES':
      return gameReduceLives(state);
    case 'SET_GAME_MODE':
      return setGameMode(state, action)
    default:
      return state;  
  }
}

/**
 * 'statusGame' state selector functions
 * 
 */
export const getPlayersLives = state => state.statusGame.numLives

export const getPlayersDeaths = state => state.statusGame.numDeaths

export const isPlayerLooser = state => state.statusGame.numLives === 2

export const getStatusGame = state => state.statusGame