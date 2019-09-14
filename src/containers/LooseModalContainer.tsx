import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import LooseModal from '../components/LooseModal';
import { 
  isPlayerLooser, 
  actionGameRestart, 
  numRoundsPlayed, 
  actionUpdateHighscore,
  getPlayersCreditAmmount } from '../stateHandle'


const LooseModalContainer = (props) => <LooseModal {...props} />

const mapStateToProps = state => ({
  isVisible: isPlayerLooser(state),
  numRoundsPlayed: numRoundsPlayed(state),
  highscore: getPlayersCreditAmmount(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameRestart,
    actionUpdateHighscore,
  }, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LooseModalContainer);
