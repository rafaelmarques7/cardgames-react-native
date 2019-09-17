import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { 
  isPlayerLooser, 
  actionGameRestart, 
  numRoundsPlayed, 
  actionUpdateHighscore,
  actionUpdateHighscoreWorld,
  getPlayersCreditAmmount, 
  isHighscoreWorldWinner} from '../stateHandle'
import LooseModal from '../components/LooseModal';

const LooseModalContainer = (props) => <LooseModal {...props} />

const mapStateToProps = state => ({
  isVisible: isPlayerLooser(state),
  isWorldWinner: isHighscoreWorldWinner(state),
  numRoundsPlayed: numRoundsPlayed(state),
  highscore: getPlayersCreditAmmount(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionGameRestart,
    actionUpdateHighscore,
    actionUpdateHighscoreWorld,
  }, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LooseModalContainer);
