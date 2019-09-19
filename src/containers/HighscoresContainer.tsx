import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import HighscoresView from '../views/HighscoresView';
import { 
  getHighscoresWorld, 
  getHighscoresPersonal,
  actionGetHighscoreWorld } from '../stateHandle'

const HighScoreContainer = (props) => <HighscoresView {...props} />

const mapStateToProps = state => ({
  scores: getHighscoresPersonal(state),
  scoresWorld: getHighscoresWorld(state)
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchHighscoreWorld: actionGetHighscoreWorld,
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HighScoreContainer)
