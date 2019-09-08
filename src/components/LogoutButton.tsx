import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native';

type cProps = {
  navigation: {
    navigate: Function,
  }
}

export default class LogoutButton extends React.Component<cProps> {
  handleSignOut = () => {
    Auth.signOut()
      .then(() => {
        console.log('log out executed successfully')
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Button 
        title="Log out"
        onPress={this.handleSignOut}/>
    )
  }
} 
