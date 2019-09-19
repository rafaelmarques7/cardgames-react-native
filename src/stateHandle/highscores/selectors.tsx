import { getUserId } from '../userState';
import { getNumberOfRoundsPlayed, getPlayersCreditAmmount } from '../game';

export const getHighscoresPersonal = state => state.highscores.highscores

export const getHighscoresWorld = state => state.highscores.highscoresWorld

export const isHighscoreWorldWinner = (state) => {
  const points = getPlayersCreditAmmount(state)
  const highscores = getHighscoresWorld(state)
  const isWinner =  highscores.length < 10 || points > highscores[highscores.length-1].points
  let index = highscores.length // base position for the case in which highscores.length < 10
  if (isWinner) { // determine the ranking of the highscore
    for (var i=0; i<highscores.length; i+=1) {
      if (points > highscores[i].points) {
        return { isWinner, index: i+1 }
      }
    }
  }
  return { isWinner, index }
}

export const buildHighscoreEntry = (state) => ({
  type: 'Highscore',
  date: `${new Date().toString()}`,
  points: getPlayersCreditAmmount(state),
  numRounds: getNumberOfRoundsPlayed(state),
  highscoreUserId: getUserId(state),
})
