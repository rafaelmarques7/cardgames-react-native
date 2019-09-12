import React from 'react'
import AnimationContainer from './AnimationContainer'
import { StyleSheet, Text } from 'react-native'
import { screen } from '../config'

const TitleApp = ({animate=true}) => {
  console.log(`inside title app`)
  return (
    <AnimationContainer
      style={styles.containerTitle}
      animate={animate} 
      animationType='bounceInUp'>
      <Text
        style={styles.title}>
        Guess What?</Text>
    </AnimationContainer>
  )
}
const styles = StyleSheet.create({
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
  title: {
    fontFamily: 'Roboto',
    fontSize: 80,
    fontWeight: '900',
    textAlign: 'center',
    color: 'white',
  },
})

export default TitleApp