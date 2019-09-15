import React from 'react'
import { connect } from "react-redux"
import { 
  getPlayersLives, 
  getPlayersDeaths, 
  getPlayersCreditAmmount } from '../stateHandle'
import StatusBar from '../components/StatusBar'

const StatusBarContainer = (props) => <StatusBar {...props} />

const mapStateToProps = (state) => ({
  numLives: getPlayersLives(state),
  numDeaths: getPlayersDeaths(state),
  numPoints: getPlayersCreditAmmount(state),
})

export default connect(
  mapStateToProps
)(StatusBarContainer);
