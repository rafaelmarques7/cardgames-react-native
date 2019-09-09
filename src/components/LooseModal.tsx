import React, { Component, useState } from 'react';
import { Text, Picker, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AnimationContainer from './AnimationContainer'

type cProps = {
  isVisible: boolean, 
  actionGameRestart: Function,
  numRoundsPlayed: number,
  highscore: number,
}

type cState = {
  animationComplete: boolean
}

class LooseModal extends React.Component<cProps, cState> { 
  state = {
    animationComplete: false
  }

  toggleState = () => {
    this.setState({animationComplete: !this.state.animationComplete})
  }

  componentDidMount() {
    setTimeout(this.toggleState, 3800)
  }

  render() {
    const { isVisible, actionGameRestart, numRoundsPlayed, highscore} = this.props;

    return (
      <Modal
        style={styles.container}
        isVisible={isVisible}
        onBackdropPress={() => actionGameRestart}>
        <View style={styles.modal}>
            <View style={styles.containerTitle}>
            <AnimationContainer 
              animate={true} animationType='bounceIn' delay={1000}>
              <Text 
                style={{...styles.text, ...styles.titleText}}>You lose!</Text>
              </AnimationContainer>
            </View>
            <View style={styles.containerInfo}>
              <AnimationContainer 
                style={styles.subTitleContainer}   
                animate={true} animationType='bounceInRight' delay={1500}>
                <Text 
                  style={styles.text}>You played </Text>
                <Text 
                  style={{...styles.text, fontWeight: 'bold'}}>{numRoundsPlayed} rounds.</Text>
              </AnimationContainer>
              <AnimationContainer 
                style={styles.subTitleContainer}                 
                animate={true} animationType='bounceInLeft' delay={2500}>
                <Text 
                  style={styles.text}>And scored </Text>
                <Text 
                  style={{...styles.text, fontWeight: 'bold'}}>{highscore} coins.</Text>
              </AnimationContainer>
            {
              !this.state.animationComplete &&
              <AnimationContainer 
                style={styles.subTitleContainer}   
                animate={true} animationType='bounceIn' delay={3500} duration={3500} count={1}>
                <TouchableOpacity
                  onPress={() => {actionGameRestart}}>
                  <Text 
                    style={styles.text}>Play again!</Text>
                </TouchableOpacity>
              </AnimationContainer>
            }
            {
              this.state.animationComplete && 
              <AnimationContainer animate={true} 
                animationType='bounceIn' delay={0} duration={4000} count={'infinite'}>
                <TouchableOpacity style={styles.playAgainContainer}
                  onPress={() => {actionGameRestart}}>
                  <Text 
                    style={{...styles.text, ...styles.playAgainText}}>
                    Play again!</Text>
                </TouchableOpacity>
              </AnimationContainer>
            }
            </View>
        </View>
      </Modal>
    )
  } 
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F3912',
  },
  containerInfo: {
    flex: 2,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    fontSize: 45,
    fontWeight: "900",
    textTransform: 'uppercase',
    color: 'white',
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playAgainContainer: {
    backgroundColor: '#1e88e5',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  playAgainText: {
    fontSize: 20,
    textTransform: 'uppercase',
  }
}) 

export default LooseModal