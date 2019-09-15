import { combineReducers } from "redux";
import { gameReducer } from "./gameState";
import { userStateReducer } from "./userState";
import { highscoreReducer } from "./highscoreState";
import { statusGameReducer } from "./statusGameState";

export const rootReducer = combineReducers({
  game: gameReducer,
  user: userStateReducer,
  statusGame: statusGameReducer,
  highscores: highscoreReducer
})
