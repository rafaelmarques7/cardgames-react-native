// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
    }
    nextToken
  }
}
`;
export const getHighscore = `query GetHighscore($id: ID!) {
  getHighscore(id: $id) {
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
export const listHighscores = `query ListHighscores(
  $filter: ModelHighscoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listHighscores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getHighscoreByPoints = `query GetHighscoreByPoints(
  $type: String
  $points: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelHighscoreFilterInput
  $limit: Int
  $nextToken: String
) {
  getHighscoreByPoints(
    type: $type
    points: $points
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
