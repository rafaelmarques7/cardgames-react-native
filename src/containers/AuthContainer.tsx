import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import AuthView from '../views/AuthView';
import { 
  actionSetUserUsername, 
  actionSetUserEmail, 
  isUserLoggedIn } from '../stateHandle'

const ConfigContainer = (props) => {
  return !props.isLoggedIn ? 
    <AuthView {...props} /> :
    null
}

const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state)
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionSetUserUsername, 
    actionSetUserEmail,
  }, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ConfigContainer);
