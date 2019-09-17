import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AnimationContainer from './AnimationContainer'

type cProps = {
  isVisible: boolean, 
  numRoundsPlayed: number,
  highscore: number,
  actionGameRestart: Function,
  actionUpdateHighscore: Function,
  actionUpdateHighscoreWorld: Function,
}

type cState = {
  animationComplete: boolean
}

class LooseModal extends React.Component<cProps, cState> { 
  state = {
    animationComplete: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.props.actionUpdateHighscore()
      this.props.actionUpdateHighscoreWorld()
    }
  }

  toggleState = () => {
    this.setState({animationComplete: !this.state.animationComplete})
  }

  componentDidMount() {
    setTimeout(this.toggleState, 3000)
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
              style={{flex: 1}}
              animate={true} animationType='bounceIn' delay={200} duration={2000}>
              <Text 
                style={{...styles.text, ...styles.titleText}}>You lose!</Text>
              </AnimationContainer>
            </View>
            <View style={styles.containerInfo}>
              <AnimationContainer 
                style={{...styles.subTitleContainer, flex: 1}}   
                animate={true} animationType='bounceInRight' delay={1000}>
                <Text 
                  style={styles.text}>You played </Text>
                <Text 
                  style={{...styles.text, fontWeight: 'bold'}}>{numRoundsPlayed} rounds.</Text>
              </AnimationContainer>
              <AnimationContainer 
                style={{...styles.subTitleContainer, flex: 1}}                 
                animate={true} animationType='bounceInLeft' delay={2000}>
                <Text 
                  style={styles.text}>And scored </Text>
                <Text 
                  style={{...styles.text, fontWeight: 'bold'}}>{highscore} coins.</Text>
              </AnimationContainer>
            {
              !this.state.animationComplete &&
              <AnimationContainer 
                style={{flex: 1, justifyContent: 'center'}}
                animate={true} animationType='bounceIn' delay={3000} duration={3000} count={1}>
                <TouchableOpacity style={styles.playAgainButton}
                  onPress={() => {actionGameRestart()}}>
                  <Text 
                    style={{...styles.text, ...styles.playAgainText}}>
                    Play again!</Text>
                </TouchableOpacity>
              </AnimationContainer>
            }
            {
              this.state.animationComplete && 
              <AnimationContainer 
                style={{flex: 1, justifyContent: 'center'}}
                animate={true} 
                animationType='bounceIn' delay={0} duration={3000} count={'infinite'}>
                <TouchableOpacity style={styles.playAgainButton}
                  onPress={() => {actionGameRestart()}}>
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
    flex: 2/3,
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
  playAgainButton: {
    flex: 2/3,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    borderRadius: 5,
  },
  playAgainText: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
}) 

export default LooseModal