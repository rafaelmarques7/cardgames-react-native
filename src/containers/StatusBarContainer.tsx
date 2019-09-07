import React from 'react';
import { connect } from "react-redux";
import { getPlayersCreditAmmount } from '../stateHandle'
import StatusBar from '../components/StatusBar';

const StatusBarContainer = (props) => {
  return (
    <StatusBar {...props} />
  )
}

const mapStateToProps = (state) => ({
  numLives: 3,
  numDeaths: 0,
  numPoints: getPlayersCreditAmmount(state),
})

export default connect(
  mapStateToProps
)(StatusBarContainer);
