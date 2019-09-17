const userInitState = {
  email: null,
  username: 'Player',
}

// state manipulation functions
function setUsername(state, action) {
  console.log('inside setUsername')
  return {
    ...state,
    username: action.payload.username
  }
}

function setEmail(state, action) {
  console.log('inside setEmail: ', action)
  return {
    ...state,
    email: action.payload.email
  }
} 	

/**
 * This is the 'user' reducer.
 * The 'combineReducer' function must use the keyword 'user' on this reducer
 * for the selectors below to work correctly.
 *  
 */
export const userStateReducer = (state=userInitState, action) => {
  switch(action.type) {
    case 'SET_USER_USERNAME':
      return setUsername(state, action)
    case 'SET_USER_EMAIL':
      return setEmail(state, action)
    default:
      return state;  
  }
}

/**
 * 'user' state selector functions
 * 
 */
// export const isUserLoggedIn = state => state.user.email !== null
export const isUserLoggedIn = state => state.user.username != 'Player'

export const getUserUsername = state => state.user.username

export const getUserEmail = state => state.user.email

export const getPlayersUsername = (state, indexPlayer=0) => getUserUsername(state)

