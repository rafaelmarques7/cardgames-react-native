import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionUpdateHighscore } from '../stateHandle/actions'
import { getHighscores } from '../stateHandle/highscoreState';
import HighscoresView from '../views/HighscoresView';

const HighScoreContainer = (props) => <HighscoresView {...props} />

const mapStateToProps = state => ({
  scores: getHighscores(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionUpdateHighscore
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HighScoreContainer)
