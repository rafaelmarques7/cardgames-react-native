import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { screen } from '../config';
import HomeCardAnimation from '../components/HomeCardAnimation';
import AnimationContainer from '../components/AnimationContainer';

type cProps = {
  navigation: {
    push: Function,
  },
}

export default class HomeScreen extends React.Component<cProps> {
  componentDidMount() {
    // console.log(this.props)
    this.props.navigation.push('Game')
  }

  render() {
    return (
      <View style={styles.container}>

        <AnimationContainer
          style={styles.containerTitle}
          animate={true} animationType='bounceInUp'>
          <Text style={styles.title}>Guess What?</Text>
        </AnimationContainer>
        
        <AnimationContainer
          style={styles.containerSubTitle}
          animate={true} animationType='slideInLeft' delay={800}>
          <Text style={styles.subTitle}>High, Low or Draw?</Text>
          <Text style={styles.subTitle}>You choose!</Text>
        </AnimationContainer>
        
        <AnimationContainer
          style={styles.containerRemaining}
          animate={true} animationType='slideInRight' delay={1600}>
          <Button title="Information" onPress={() => this.props.navigation.push('Info')} />
          <AnimationContainer
            style={{flex:0}}
            animate={true} animationType='rubberBand' delay={3200} count='infinite'>
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
    color: 'white',
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  }
})
