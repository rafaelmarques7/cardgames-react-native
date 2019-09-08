import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GameInfoView from './GameInfo';
import HighScoreView from './Highscores';
import GameContainer from '../containers/GameContainer';
import AuthContainer from '../containers/AuthContainer';
import { screen } from '../config';
import HomeCardAnimation from '../components/HomeCardAnimation';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.push('Game')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Guess What?</Text>
        </View>
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>High, Low or Draw?</Text>
          <Text style={styles.subTitle}>You choose!</Text>
        </View>
        <View style={styles.containerRemaining}>
          <Button title="Play Game" onPress={()=>this.props.navigation.push('Game')} />
          <Button title="Information" onPress={() => this.props.navigation.push('Info')} />
          <Button title="Highscores" onPress={() => this.props.navigation.push('Highscore')} />
        </View>
        <View style={styles.containerExample}>
          <HomeCardAnimation />
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
    screen: AuthContainer, 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: 'green',
  },
  containerTitle: {
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 15,
    width: screen.width * 0.9,
  }, 
  containerSubTitle: {
    flex: 2,
  },
  containerRemaining: {
    flex: 3,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  containerExample: {
    flex: 5,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 80,
    fontWeight: '900',
    textAlign: 'center',
    // textTransform: 'uppercase',
    color: 'white',
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  }
})

export default createAppContainer(AppNavigator);