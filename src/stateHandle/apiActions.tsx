import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, getHighscoreByPoints } from '../graphql/queries';
import { createHighscore } from '../graphql/mutations';

type Highscore = {
  type: 'Highscore', // primary partition key - set to same value on all data entries
  id: String, // hash
  ownerId: number, // playerID
  points: number, 
  numRounds: number,
  date: Date
}

export async function getAllUsers() {
  console.log('inside getAllUsers')
  const data = await API.graphql(graphqlOperation(listUsers, {}))
  console.log(data)
  return data
}

export async function getWorldHighscores(limit=10) {
  console.log('inside getWorldHighscores')
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

export async function updateWorldLeaderboard(highscore: Highscore) {
  console.log('inside updateWorldLeaderboard')
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
