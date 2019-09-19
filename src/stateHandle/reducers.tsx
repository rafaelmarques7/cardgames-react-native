import { combineReducers } from "redux";
import { gameReducer } from "./gameState";
import { userStateReducer } from "./userState";
import { statusGameReducer } from "./statusGameState";
import { highscoreReducer } from "./highscores";

export const rootReducer = combineReducers({
  game: gameReducer,
  user: userStateReducer,
  statusGame: statusGameReducer,
  highscores: highscoreReducer,
})
