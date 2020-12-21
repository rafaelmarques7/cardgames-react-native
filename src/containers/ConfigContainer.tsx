import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionSetNumberOfCards, actionSetShouldDisplayOdds, getNumberOfCardsPerHand } from '../stateHandle'
import ConfigMenu from '../components/ConfigMenu';

const ConfigContainer = (props) => <ConfigMenu {...props} />

const mapStateToProps = state => ({
  shouldDisplayOdds: state.game.shouldDisplayOdds,
  numCardsPerHand: getNumberOfCardsPerHand(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionSetNumberOfCards,
    actionSetShouldDisplayOdds,
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(ConfigContainer);
