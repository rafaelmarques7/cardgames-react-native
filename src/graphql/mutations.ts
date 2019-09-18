// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    email
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    email
  }
}
`;
export const createHighscore = `mutation CreateHighscore($input: CreateHighscoreInput!) {
  createHighscore(input: $input) {
    type
    points
    numRounds
    date
    user {
      id
      username
      email
    }
  }
}
`;
export const updateHighscore = `mutation UpdateHighscore($input: UpdateHighscoreInput!) {
  updateHighscore(input: $input) {
    type
    points
    numRounds
    date
    user {
      id
      username
      email
    }
  }
}
`;
export const deleteHighscore = `mutation DeleteHighscore($input: DeleteHighscoreInput!) {
  deleteHighscore(input: $input) {
    type
    points
    numRounds
    date
    user {
      id
      username
      email
    }
  }
}
`;
