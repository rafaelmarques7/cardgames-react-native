import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionSetNumberOfCards } from '../stateHandle'
import ConfigMenu from '../components/ConfigMenu';

const ConfigContainer = (props) => <ConfigMenu {...props} />

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionSetNumberOfCards
  }, dispatch)
}

export default connect(
  null, mapDispatchToProps
)(ConfigContainer);
