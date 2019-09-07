import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { isPlayerLooser, actionGameRestart, numRoundsPlayed, getPlayersCreditAmmount } from '../stateHandle'
import LooseModal from '../components/LooseModal';

const LooseModalContainer = (props) => {
  return (
    <LooseModal {...props} />
  )
}

const mapStateToProps = state => ({
  isVisible: isPlayerLooser(state),
  numRoundsPlayed: numRoundsPlayed(state),
  highscore: getPlayersCreditAmmount(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameRestart,
  }, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LooseModalContainer);
