import React from 'react';
import { connect } from "react-redux";
import StatusBar from '../components/StatusBar';
import { 
  getPlayersLives, 
  getPlayersDeaths, 
  getPlayersCreditAmmount } from '../stateHandle'

const StatusBarContainer = (props) => {
  return (
    <StatusBar {...props} />
  )
}

const mapStateToProps = (state) => {
  state = state.game
  return {
    numLives: getPlayersLives(state),
    numDeaths: getPlayersDeaths(state),
    numPoints: getPlayersCreditAmmount(state),
  }
}

export default connect(
  mapStateToProps
)(StatusBarContainer);
