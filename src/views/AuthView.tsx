/**
 * This is a stand-alone component that handles authentication.
 * This includes the ability to register, and to login.
 * Registration is done using email, and requires a confirmation code.
 * 
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import LogoutButton from '../components/LogoutButton';
import { screen } from '../config';
import { blueLightBackground, greyMedium, stylesApp } from '../styles';

type cProps = {
  isLoggedIn: boolean,
  actionCreateUser: Function,
  actionSetUserUsername: Function,
  actionSetUserEmail: Function,
  navigation: {
    navigate: Function,
  }
}

type cState = {
  email: string,
  password: string,
  confirmPassword: string,
  confirmationCode: string,
  confirmationCodeVisible: boolean,
  displayLogin: boolean,
  username: string
  displaySelectUsername: boolean,
}

export default class AuthView extends React.Component<cProps, cState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      confirmationCodeVisible: false,
      displayLogin: true,  // display sign-in on true; display sign-up on false
      username: '',
      displaySelectUsername: false
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('Home')
    }
  }

  // authentication
  handeLogin = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // If we are successful, navigate to Home screen
      .then(user => {
        console.log('Auth.signIn successfull')
        this.props.actionSetUserEmail(email)
        this.props.navigation.navigate('Home')
      })
      // On failure, display error in console
      .catch(err => console.log(err));
  }

  // registation
  handleRegistration = () => {
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) { // Confirm passwords match
      Auth.signUp({
        username: email,
        password,
        attributes: { email },
        })
        // Require confirmation code authentication
        .then(() => this.setState({ confirmationCodeVisible: true }))
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }
  }

  // additional security with confirmation code
  handleConfirmationCode = () => {
    const { email, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ confirmationCodeVisible: false });
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }

  toggleSignType = () => {
    this.setState({ displayLogin: !this.state.displayLogin })
  }

  renderRegistrationForm = () => (
    <>
      <Input
        placeholder="   Email address"
        leftIcon={{ type: 'font-awesome', name: 'user' }}    
        placeholderTextColor={greyMedium} 
        onChangeText={(value) => this.setState({ email: value })} />
      <Input
        placeholder="   Password"
        secureTextEntry
        placeholderTextColor={greyMedium} 
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(value) => this.setState({ password: value })} />
      <Input
        placeholder="   Confirm Password"
        secureTextEntry
        placeholderTextColor={greyMedium} 
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(value) => this.setState({ confirmPassword: value })} />
    </>
  )

  renderConfirmationCodeForm = () => (
   <>
    <Input
      placeholder="Confirmation Code"
      leftIcon={{ type: 'font-awesome', name: 'check' }}
      onChangeText={(value) => this.setState({ confirmationCode: value })} />  
   </> 
  )
  
  renderLoginForm = () => (
    <>
      <Input
        placeholder="   Email address"
        placeholderTextColor={greyMedium} 
        leftIcon={{ type: 'font-awesome', name: 'user' }}     
        onChangeText={(value) => this.setState({ email: value })} />
      <Input
        placeholder="   Password"
        secureTextEntry
        placeholderTextColor={greyMedium} 
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(value) => this.setState({ password: value })} />   
    </>
  )
  

  handleUsernameSelect() {
    this.props.actionCreateUser(this.state.username)
    this.props.navigation.navigate('Home')
  }

  renderSkipButton = () => {
    if (this.state.displaySelectUsername) {
      return(
        <Button
          disabled={this.state.username === '' }
          title="Click to proceed." 
          onPress={this.handleUsernameSelect.bind(this)}/>
        )          
    }
    return(
      <Button
        title="Skip registration" 
        onPress={() => this.setState({displaySelectUsername: true})}/>
      )    
  }

  renderUsernameForm = () => (
    <>
      <Text 
        style={{...styles.textSubtitle, marginBottom: 10}}>
        Please choose a cool username.</Text>
      <Input
        placeholder="   Username"
        placeholderTextColor={greyMedium} 
        leftIcon={{ type: 'font-awesome', name: 'user' }}     
        onChangeText={(value) => this.setState({ username: value })} /> 
    </>
  )
  

  renderActionButton = () => {
    let buttonTitle = ''
    let buttonAction = null
    let renderButton = false
    if (this.state.displayLogin) {
      buttonTitle = 'Login'
      buttonAction = this.handeLogin
      renderButton = this.state.email !== '' && this.state.password !== ''
    }
    if (!this.state.displayLogin && !this.state.confirmationCodeVisible) {
      buttonTitle = 'Register'
      buttonAction = this.handleRegistration
      renderButton = this.state.email !== '' && this.state.password !== '' && this.state.confirmPassword !== ''
    }
    if (this.state.confirmationCodeVisible) {
      buttonTitle = 'Confirm'
      buttonAction = this.handleConfirmationCode
      renderButton = true
    }
    return (renderButton && <Button title={buttonTitle} onPress={buttonAction} />)
  }

  renderAuthOptions = () => (
    <>
      <TouchableOpacity 
        onPress={this.toggleSignType}
        style={{
          ...styles.optionItem, 
          backgroundColor: this.state.displayLogin ? 'white' : blueLightBackground 
        }}>
        <Text>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={this.toggleSignType}
        style={{
          ...styles.optionItem, 
          backgroundColor: !this.state.displayLogin ? 'white' : blueLightBackground 
        }}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </>
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.textTitle}>Welcome!</Text>
          <Text style={styles.textSubtitle}>Please take a minute to sign-in or to register an account.</Text>
        </View>
        <View style={styles.containerMain}>
          { 
            !this.state.displaySelectUsername && 
            <> 
              <View style={styles.containerOptions}>
                {this.renderAuthOptions()}
              </View>
              <View style={styles.actionContainer}>
                {this.state.displayLogin && this.renderLoginForm()}
                {!this.state.displayLogin && this.renderRegistrationForm()}
                {this.state.confirmationCodeVisible && this.renderConfirmationCodeForm()}
                {this.renderActionButton()}
              </View> 
            </>
          }
          {
            this.state.displaySelectUsername && 
            this.renderUsernameForm()

          }
        </View>
        
        <View style={styles.skipContainer}>
          {this.renderSkipButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: 'white',
    fontSize: 25
  },
  containerOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  optionItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    flex: 8,
    alignItems: 'center',
  },
  skipContainer: {},
  welcomeContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 40,
    fontFamily: 'Roboto',
    textAlign: 'center', 
  },
  textSubtitle: {
    fontSize: 15,
    fontFamily: 'Roboto',
    textAlign: 'center', 
  },
  containerPlaceholder: {
    flex: 4,
  },
  containerMain: {
    flex: 8,
    margin: 10,
    borderRadius: 20,
    alignContent: 'center',
  }
});
