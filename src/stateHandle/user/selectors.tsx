/**
 * 'user' state selector functions
 * 
 */
export const isUserLoggedIn = state => state.user.username !== 'Player'

export const getUserUsername = state => state.user.username

export const getUserEmail = state => state.user.email

export const getPlayersUsername = (state, indexPlayer=0) => getUserUsername(state)

export const getUserId = state => state.user.id
