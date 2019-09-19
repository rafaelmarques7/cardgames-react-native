import get from 'lodash.get';

const userInitState = {
  id: null,
  email: null,
  username: 'Player',
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
    case 'SET_USER_ID':
      return setUserId(state, action)
    default:
      return state;  
  }
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

function setUserId(state, action) {
  const id = get(action.payload.data, 'data.createUser.id', null)
  console.log('inside setUserId: ', id)
  return {
    ...state,
    id: id,
  }
}

