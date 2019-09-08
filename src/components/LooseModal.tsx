import React, { Component } from 'react';
import { Text, Picker, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AnimationContainer from './AnimationContainer'

const LooseModal = ({ 
  isVisible, 
  actionGameRestart,
  numRoundsPlayed,
  highscore
 }) => (
  <Modal
    style={styles.container}
    isVisible={isVisible}
    onBackdropPress={actionGameRestart}>
    <View style={styles.modal}>
        <View style={styles.containerTitle}>
        <AnimationContainer animate={true} animationType='bounceIn' delay={1000}>
          <Text style={styles.titleText}>You loose!</Text>
          </AnimationContainer>
        </View>
        <View style={styles.containerInfo}>
          <AnimationContainer animate={true} animationType='bounceInRight' delay={1500}>
            <Text>You played {numRoundsPlayed} rounds.</Text>
          </AnimationContainer>
          <AnimationContainer animate={true} animationType='bounceInLeft' delay={2500}>
            <Text>And scored a total of {highscore} points.</Text>
          </AnimationContainer>
          <AnimationContainer animate={true} animationType='bounceIn' delay={3500} duration={3500} count={10}>
            <TouchableOpacity
              onPress={actionGameRestart}>
              <Text>Play again!</Text>
            </TouchableOpacity>
          </AnimationContainer>
        </View>
    </View>
  </Modal>
) 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerInfo: {
    flex: 2,
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: "900",
    textTransform: 'uppercase',
    // backgroundColor: 'white',
    textAlign: 'center',
  }
}) 

export default LooseModal