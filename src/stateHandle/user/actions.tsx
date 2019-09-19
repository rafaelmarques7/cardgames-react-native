import { getUserEmail } from "./selectors"
import { apiCreateUser } from "./api"

export const actionCreateUser = (username) => {
  return async (dispatch, getState) => {
    try {
      console.log('inside actionCreateUser')
      dispatch(actionSetUserUsername(username)) // dispatch internal action to set username 
      const email = getUserEmail(getState())
      const data = await apiCreateUser(username, email) // dispatch action to create user on the backend
      dispatch(actionSetUserId(data)) // dispatch internal action to set ID
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

export const actionSetUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  payload: {
    email: email,
  }
})
