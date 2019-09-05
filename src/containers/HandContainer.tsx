import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPlayerInfo, getDealerInfo } from '../stateHandle'

const HandContainer = (props) => {
  return (
    null
  )
}

const mapStateToProps = state => {
  player: getPlayerInfo(state),
  dealer: getDealerInfo(state),
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(
  null, mapDispatchToProps
)(HandContainer);
