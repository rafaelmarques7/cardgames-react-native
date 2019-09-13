import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GameContainer from '../containers/GameContainer';
import AuthContainer from '../containers/AuthContainer';
import HighScoreView from '../views/Highscores';
import GameInfoView from '../views/GameInfo';
import HomeView from '../views/HomeView';

const HomeContainer = (props) => <HomeView {...props}/>

// all child components of AppNavigation contain the prop `navigation`
const AppNavigator = createStackNavigator({
  AuthView: {
    screen: AuthContainer, 
    navigationOptions: {
        header: null,
    },
  },
  Home: {
    screen: HomeContainer, 
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
  Info: {
    screen: GameInfoView, 
    navigationOptions: {
        header: null,
    },
  },
  Highscore: {
    screen: HighScoreView, 
    navigationOptions: {
        header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
