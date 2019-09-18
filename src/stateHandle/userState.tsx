import { API, graphqlOperation } from "aws-amplify"
import { createUser } from "../graphql/mutations"
// import { actionSetUserUsername } from "./actions"
import get from 'lodash.get';

const userInitState = {
  id: null,
  email: null,
  username: 'Player',
}

// action creator
export const actionCreateUser = (username) => {
  return async (dispatch, getState) => {
    try {
      console.log('inside actionCreateUser')
      // dispatch internal action to set username
      dispatch(actionSetUserUsername(username))
      // dispatch action to create user on the backend
      const email = getUserEmail(getState())
      const data = await apiCreateUser(username, email)
      // dispatch internal action to set ID
      dispatch(actionSetUserId(data))
    } catch(e) {
      console.log(e)
    }
  }
}

export const actionSetUserUsername = (username) => ({
  type: 'SET_USER_USERNAME',
  payload: {
    username: username,
  }
})

export const actionSetUserId = (data) => ({
  type: 'SET_USER_ID',
  payload: {
    data
  }
})

// API function
export const apiCreateUser = async (username, email) => {
  console.log('inside apiCreateUser')
  try {
    return await API.graphql(graphqlOperation(createUser, {
      input: {  
        username,
        email
      }
    }))
  } catch (e) {
    console.log(e)
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

/**
 * 'user' state selector functions
 * 
 */
export const isUserLoggedIn = state => state.user.username !== 'Player'

export const getUserUsername = state => state.user.username

export const getUserEmail = state => state.user.email

export const getPlayersUsername = (state, indexPlayer=0) => getUserUsername(state)

export const getUserId = state => state.user.id
