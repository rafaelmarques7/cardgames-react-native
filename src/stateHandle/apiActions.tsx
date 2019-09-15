import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listHighscores } from '../graphql/queries';
import { createHighscore } from '../graphql/mutations';

export async function getAllUsers() {
  console.log('inside getAllUsers')
  const data = await API.graphql(graphqlOperation(listUsers, {}))
  console.log(data)
  return data
}

export async function getTopWorldHighscores() {
  console.log('inside getTopWorldHighscores')
  const data = await API.graphql(graphqlOperation(listHighscores, {
    limit: 3,
    order_by: 'points_DESC'
  }))
  console.log(data)
  return data
}

export async function putHighscore() {
  console.log('inside putHighscore')
  for(var i=0; i<10; i+=1) {
    console.log(i)
    try {
      const data = await API.graphql(graphqlOperation(createHighscore, {
        input: {
          id: i, ownerId: i, points: 2**i, numRounds: i+1, date: Date.now().toString()
        }
      }))
      console.log(data)      
    } catch(e) {
      console.log(e)
    }
  }
}

