// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
    email
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
    email
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    username
    email
  }
}
`;
export const onCreateHighscore = `subscription OnCreateHighscore {
  onCreateHighscore {
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
export const onUpdateHighscore = `subscription OnUpdateHighscore {
  onUpdateHighscore {
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
export const onDeleteHighscore = `subscription OnDeleteHighscore {
  onDeleteHighscore {
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
