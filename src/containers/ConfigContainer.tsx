import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionSetNumberOfCards } from '../stateHandle'
import ModalConfiguration from '../components/ModalConfiguration';

const ConfigContainer = (props) => {
  return (
    <ModalConfiguration {...props} />
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionSetNumberOfCards
  }, dispatch)
}

export default connect(
  null, mapDispatchToProps
)(ConfigContainer);