import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import AuthView from '../views/AuthView';
import { 
  actionSetUserUsername, 
  actionSetUserEmail, 
  isUserLoggedIn } from '../stateHandle'
import HomeView from '../views/HomeView';
import { Text } from 'react-native';

const AuthContainer = (props) => <AuthView {...props} />

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
)(AuthContainer);
