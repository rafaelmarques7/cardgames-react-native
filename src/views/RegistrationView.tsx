import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

type cProps = {
  navigation: {
    navigate: Function,
  }
}

type cState = {
  email: string,
  password: string,
  confirmPassword: string,
  confirmationCode: string,
  modalVisible: boolean,
}

export default class RegistrationView extends React.Component<cProps, cState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      modalVisible: false,
    };
  }

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) { // Confirm passwords match
      Auth.signUp({
        username: email,
        password,
        attributes: { email },
        })
        // Require confirmation code authentication
        .then(() => this.setState({ modalVisible: true }))
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }
  }

  handleConfirmationCode = () => {
    const { email, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <Input
          placeholder="Email address"
          leftIcon={{ type: 'font-awesome', name: 'user' }}     
          onChangeText={(value) => this.setState({ email: value })} />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(value) => this.setState({ password: value })} />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(value) => this.setState({ confirmPassword: value })} />
        { !this.state.modalVisible && 
          <Button
            title='Submit'
            onPress={ this.handleSignUp } />
        }
        { this.state.modalVisible &&
          <Input
            placeholder="Confirmation Code"
            leftIcon={{ type: 'font-awesome', name: 'check' }}
            onChangeText={(value) => this.setState({ confirmationCode: value })} />  
        }
        { this.state.modalVisible &&
          <Button
            title='Confirm'
            onPress={this.handleConfirmationCode} />
        }   
        <Button
          title="Skip Registration" 
          onPress={() => this.props.navigation.navigate('Home')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
});
