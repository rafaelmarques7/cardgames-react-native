import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import HighscoresView from '../views/HighscoresView';
import { 
  fetchHighscoreWorld, 
  getHighscores, 
  getHighscoresWorld } from '../stateHandle'

const HighScoreContainer = (props) => <HighscoresView {...props} />

const mapStateToProps = state => ({
  scores: getHighscores(state),
  scoresWorld: getHighscoresWorld(state)
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchHighscoreWorld,
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HighScoreContainer)
