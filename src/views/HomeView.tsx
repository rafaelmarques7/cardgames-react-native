import React from 'react'
import { Text, View, Button, StyleSheet, processColor } from 'react-native'
import { screen } from '../config';
import HomeCardAnimation from '../components/HomeCardAnimation';
import AnimationContainer from '../components/AnimationContainer';
import TitleApp from '../components/TitleApp';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionGetHighscoreWorld as  fetchHighscoreWorld } from '../stateHandle'
import { colorsApp } from '../styles';

type cProps = {
  fetchHighscoreWorld: Function,
  navigation: {
    push: Function,
  },
}

class HomeScreen extends React.Component<cProps> {
  componentDidMount() {
    this.props.fetchHighscoreWorld()
    // dev purposes only
    // this.props.navigation.push('Game')
    // this.props.navigation.push('Highscore')
  }

  render() {
    return (
      <View style={styles.container}>

        <TitleApp />
        
        <AnimationContainer
          style={styles.containerSubTitle}
          animate={true} animationType='slideInLeft' iterationDelay={800}>
          <Text style={styles.subTitle}>High, Low or Draw?</Text>
          <Text style={styles.subTitle}>You choose!</Text>
        </AnimationContainer>
        
        <AnimationContainer
          style={styles.containerRemaining}
          animate={true} animationType='slideInRight' iterationDelay={1600}>
          <Button title="Information" onPress={() => this.props.navigation.push('Info')} />
          <AnimationContainer
            style={{flex:0}}
            animate={true} animationType='rubberBand' iterationDelay={3200} iterationCount='infinite'>
            <Button title="Play Game" onPress={()=>this.props.navigation.push('Game')} />
          </AnimationContainer>
          <Button title="Highscores" onPress={() => this.props.navigation.push('Highscore')} />
        </AnimationContainer>
        
        <AnimationContainer 
          style={styles.containerExample}
          animate={true} animationType='bounceInDown'>
          <HomeCardAnimation />
        </AnimationContainer>
    
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: colorsApp.green,
  },
  containerTitle: {
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colorsApp.white,
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
    color: colorsApp.white,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: 'center',
    color: colorsApp.white,
  }
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchHighscoreWorld,
  }, dispatch)
}

export default connect(
  null, 
  mapDispatchToProps
)(HomeScreen);
