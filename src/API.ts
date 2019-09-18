/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateHighscoreInput = {
  type: string,
  points: number,
  numRounds: number,
  date: string,
  highscoreUserId?: string | null,
};

export type UpdateHighscoreInput = {
  type?: string | null,
  points?: number | null,
  numRounds?: number | null,
  date?: string | null,
  highscoreUserId?: string | null,
};

export type DeleteHighscoreInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  username?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelHighscoreFilterInput = {
  type?: ModelStringFilterInput | null,
  points?: ModelIntFilterInput | null,
  numRounds?: ModelIntFilterInput | null,
  date?: ModelStringFilterInput | null,
  and?: Array< ModelHighscoreFilterInput | null > | null,
  or?: Array< ModelHighscoreFilterInput | null > | null,
  not?: ModelHighscoreFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type CreateHighscoreMutationVariables = {
  input: CreateHighscoreInput,
};

export type CreateHighscoreMutation = {
  createHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type UpdateHighscoreMutationVariables = {
  input: UpdateHighscoreInput,
};

export type UpdateHighscoreMutation = {
  updateHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type DeleteHighscoreMutationVariables = {
  input: DeleteHighscoreInput,
};

export type DeleteHighscoreMutation = {
  deleteHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetHighscoreQueryVariables = {
  id: string,
};

export type GetHighscoreQuery = {
  getHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type ListHighscoresQueryVariables = {
  filter?: ModelHighscoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHighscoresQuery = {
  listHighscores:  {
    __typename: "ModelHighscoreConnection",
    items:  Array< {
      __typename: "Highscore",
      type: string,
      points: number,
      numRounds: number,
      date: string,
      user:  {
        __typename: "User",
        id: string,
        username: string,
        email: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetHighscoreByPointsQueryVariables = {
  type?: string | null,
  points?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHighscoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetHighscoreByPointsQuery = {
  getHighscoreByPoints:  {
    __typename: "ModelHighscoreConnection",
    items:  Array< {
      __typename: "Highscore",
      type: string,
      points: number,
      numRounds: number,
      date: string,
      user:  {
        __typename: "User",
        id: string,
        username: string,
        email: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string | null,
  } | null,
};

export type OnCreateHighscoreSubscription = {
  onCreateHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type OnUpdateHighscoreSubscription = {
  onUpdateHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};

export type OnDeleteHighscoreSubscription = {
  onDeleteHighscore:  {
    __typename: "Highscore",
    type: string,
    points: number,
    numRounds: number,
    date: string,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string | null,
    } | null,
  } | null,
};
