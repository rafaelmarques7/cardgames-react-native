import React, { Component } from 'react';
import { Text, Picker, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

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
      <Text>You loose :/</Text>
      <Text>You played {numRoundsPlayed} rounds</Text>
      <Text>And scored a total of {highscore} points</Text>
      <TouchableOpacity
        onPress={actionGameRestart}>
        <Text>Play again!</Text>
      </TouchableOpacity>
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
}) 

export default LooseModal