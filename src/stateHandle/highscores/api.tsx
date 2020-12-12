import { API, graphqlOperation } from 'aws-amplify'
import { getHighscoreByPoints } from '../../graphql/queries'
import { createHighscore } from '../../graphql/mutations'

export type HighscoreDbEntry = {
  type: String, // primary partition key - set to same value on all data entries to allow sorting
  points: number, 
  numRounds: number,
  date: String,
  highscoreUserId: String,
}

export async function apiGetWorldHighscores(limit=10) {
  console.log('inside apiGetWorldHighscores')
  try {
    return await API.graphql(graphqlOperation(getHighscoreByPoints, {
      type: 'Highscore', // tpye is the partition key - set to 'Highscore' on all entries
      limit: limit,
      sortDirection: "DESC",
    }))
  } catch (e) {
    console.log('apiGetWorldHighscores threw error: \n',e)
  } 
}

export async function apiUpdateWorldHighscores(highscore: HighscoreDbEntry) {
  console.log('inside apiUpdateWorldHighscores')
  try {
    return await API.graphql(graphqlOperation(createHighscore, {
      input: {
        ...highscore
      }
    }))
  } catch(e) {
    console.log('updateWorldLeaderboard threw error: \n', e)
  }
}
