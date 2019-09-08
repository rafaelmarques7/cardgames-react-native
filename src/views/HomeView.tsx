import React from 'react'
import { Text, View, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GameInfoView from './GameInfo';
import HighScoreView from './Highscores';
import GameContainer from '../containers/GameContainer';
import AuthView from './AuthView';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <View>
        <Text>Home</Text>
          <Text>This component should be animated on mount</Text>
          <Text>Present title in that animation</Text>
          <Text>Possibly present an illustration of the game</Text>
        </View>
        <View>
          <Text>Route</Text>
          <Button title="Play Game" onPress={()=>this.props.navigation.push('Game')} />
          <Button title="Information" onPress={() => this.props.navigation.push('Info')} />
          <Button title="Highscores" onPress={() => this.props.navigation.push('Highscore')} />
        </View>
      </View>
    )
  }
}

/**
 * All components rendered with this createStackNavigator function
 * it will be given a 'navigation' prop
 * ref: https://facebook.github.io/react-native/docs/navigation
 */
const AppNavigator = createStackNavigator({
  AuthView: {
    screen: AuthView, 
    navigationOptions: {
        header: null,
    },
  },
  Home: {
    screen: HomeScreen, 
    navigationOptions: {
        header: null,
    },
  },
  Game: {
    screen: GameContainer, 
    navigationOptions: {
        header: null,
    },
  },
  Info: GameInfoView,
  Highscore: HighScoreView,
});

export default createAppContainer(AppNavigator);