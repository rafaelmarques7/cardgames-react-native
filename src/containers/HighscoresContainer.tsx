import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getHighscores } from '../stateHandle/highscoreState';
import HighscoresView from '../views/HighscoresView';
import { 
  actionUpdateHighscore, 
  actionGetHighscoreWorld,
  actionSetHighscoreWorld,
  fetchHighscoreWorld } from '../stateHandle'

const HighScoreContainer = (props) => <HighscoresView {...props} />

const mapStateToProps = state => ({
  scores: getHighscores(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionUpdateHighscore,
    actionGetHighscoreWorld,
    actionSetHighscoreWorld,
    fetchHighscoreWorld,
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HighScoreContainer)
