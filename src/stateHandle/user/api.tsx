import { API, graphqlOperation } from "aws-amplify"
import { createUser } from "../../graphql/mutations"

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