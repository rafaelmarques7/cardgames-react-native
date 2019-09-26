import { combineReducers } from "redux";
import { gameReducer } from "./game";
import { userStateReducer } from "./user";
import { statusGameReducer } from "./statusGame";
import { highscoreReducer } from "./highscores";

export const rootReducer = combineReducers({
  game: gameReducer,
  user: userStateReducer,
  statusGame: statusGameReducer,
  highscores: highscoreReducer,
})
